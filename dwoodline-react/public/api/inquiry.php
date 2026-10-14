<?php
/**
 * Contact form handler for dwoodline.com.
 *
 * Receives the website's JSON POST and emails it to the studio inbox.
 * Deployed with the rest of the site (Vite copies public/ into dist/), so it
 * lives at /api/inquiry.php. Needs PHP's mail(), which Hostinger provides.
 */
declare(strict_types=1);

const INQUIRY_TO = 'info@dwoodline.com';
// Sending from an address on the same domain keeps the message out of spam.
const INQUIRY_FROM = 'info@dwoodline.com';
const RATE_LIMIT_PER_HOUR = 8;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

// Same-site requests only: if the browser sends an Origin, its host must be ours.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = preg_replace('/^www\./i', '', (string) parse_url($origin, PHP_URL_HOST));
    $ownHost = preg_replace('/^www\./i', '', (string) ($_SERVER['HTTP_HOST'] ?? ''));
    $ownHost = preg_replace('/:\d+$/', '', $ownHost);
    if ($originHost === '' || strcasecmp($originHost, $ownHost) !== 0) {
        respond(403, ['ok' => false, 'error' => 'forbidden']);
    }
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode($raw === false ? '' : $raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'bad_request']);
}

// Honeypot: real visitors never see or fill this field. Pretend success for bots.
if (!empty($data['company_url'])) {
    respond(200, ['ok' => true]);
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

// Anything that ends up in a mail header must not contain line breaks.
$name = preg_replace('/[\r\n]+/', ' ', $name);
$email = preg_replace('/[\r\n]+/', '', $email);

$errors = [];
if ($name === '' || mb_strlen($name) > 100) {
    $errors['name'] = 'invalid';
}
if (
    $email === ''
    || mb_strlen($email) > 254
    || !preg_match('/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/', $email)
) {
    $errors['email'] = 'invalid';
}
if ($message === '' || mb_strlen($message) > 5000) {
    $errors['message'] = 'invalid';
}
if ($errors !== []) {
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);
}

// Light rate limit per visitor, kept in a small temp file (no database needed).
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/dwoodline_inquiry_' . hash('sha256', $ip) . '.json';
$now = time();
$hits = [];
if (is_file($bucket)) {
    $stored = json_decode((string) @file_get_contents($bucket), true);
    if (is_array($stored)) {
        $hits = array_values(array_filter($stored, static fn ($t) => is_int($t) && $t > $now - 3600));
    }
}
if (count($hits) >= RATE_LIMIT_PER_HOUR) {
    respond(429, ['ok' => false, 'error' => 'rate_limited']);
}

$subject = mb_encode_mimeheader('New website inquiry from ' . mb_substr($name, 0, 40), 'UTF-8', 'B', "\r\n");
$body = "New inquiry from the dwoodline.com contact form\n\n"
    . "Name:    {$name}\n"
    . "Email:   {$email}\n"
    . "Sent:    " . gmdate('Y-m-d H:i') . " UTC\n\n"
    . "Message:\n{$message}\n";

$headers = [
    'From: D Woodline Website <' . INQUIRY_FROM . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: dwoodline-contact-form',
];

$sent = @mail(INQUIRY_TO, $subject, $body, implode("\r\n", $headers), '-f' . INQUIRY_FROM);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'send_failed']);
}

// Count only deliveries, so a failed send never uses up a visitor's quota.
$hits[] = $now;
@file_put_contents($bucket, json_encode($hits), LOCK_EX);

respond(200, ['ok' => true]);
