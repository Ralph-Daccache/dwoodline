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
const SMTP_HOST = 'smtp.hostinger.com';
const SMTP_PORT = 465;

/**
 * Mail credentials live in api/config.php, written at deploy time from a GitHub
 * secret and never committed. Without it the handler falls back to PHP mail().
 */
function mailConfig(): array
{
    $file = __DIR__ . '/config.php';
    if (!is_file($file)) {
        return [];
    }
    $cfg = include $file;
    return is_array($cfg) ? $cfg : [];
}

/** Reads one (possibly multi-line) SMTP reply and returns its numeric code. */
function smtpRead($fp): int
{
    $code = 0;
    while (($line = fgets($fp, 515)) !== false) {
        $code = (int) substr($line, 0, 3);
        if (strlen($line) < 4 || $line[3] === ' ') {
            break;
        }
    }
    return $code;
}

function smtpCmd($fp, string $cmd, array $ok): bool
{
    fwrite($fp, $cmd . "\r\n");
    return in_array(smtpRead($fp), $ok, true);
}

/** Sends one message over authenticated, encrypted SMTP. Returns true only if the server accepted it. */
function smtpSend(string $user, string $pass, string $to, string $rawMessage): bool
{
    $fp = @stream_socket_client(
        'ssl://' . SMTP_HOST . ':' . SMTP_PORT,
        $errno,
        $errstr,
        15,
        STREAM_CLIENT_CONNECT
    );
    if (!$fp) {
        return false;
    }
    stream_set_timeout($fp, 15);
    $ok = smtpRead($fp) === 220
        && smtpCmd($fp, 'EHLO dwoodline.com', [250])
        && smtpCmd($fp, 'AUTH LOGIN', [334])
        && smtpCmd($fp, base64_encode($user), [334])
        && smtpCmd($fp, base64_encode($pass), [235])
        && smtpCmd($fp, 'MAIL FROM:<' . $user . '>', [250])
        && smtpCmd($fp, 'RCPT TO:<' . $to . '>', [250, 251])
        && smtpCmd($fp, 'DATA', [354]);
    if ($ok) {
        // Dot-stuff lines that start with ".", then end the message.
        $data = preg_replace('/^\./m', '..', str_replace(["\r\n", "\r"], "\n", $rawMessage));
        fwrite($fp, str_replace("\n", "\r\n", $data) . "\r\n.\r\n");
        $ok = smtpRead($fp) === 250;
    }
    @fwrite($fp, "QUIT\r\n");
    @fclose($fp);
    return $ok;
}

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
$phone = trim((string) ($data['phone'] ?? ''));

// Anything that ends up in a mail header must not contain line breaks.
$name = preg_replace('/[\r\n]+/', ' ', $name);
$email = preg_replace('/[\r\n]+/', '', $email);
$phone = preg_replace('/[\r\n]+/', ' ', $phone);

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
// Phone is optional; when given it must look like a phone number.
if ($phone !== '' && !preg_match('/^[0-9+()\-.\s]{6,25}$/', $phone)) {
    $errors['phone'] = 'invalid';
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
    . 'Phone:   ' . ($phone !== '' ? $phone : 'not given') . "\n"
    . "Sent:    " . gmdate('Y-m-d H:i') . " UTC\n\n"
    . "Message:\n{$message}\n";

$cfg = mailConfig();
$smtpPass = isset($cfg['smtp_pass_b64']) ? (string) base64_decode((string) $cfg['smtp_pass_b64'], true) : '';

$headerLines = [
    'Date: ' . gmdate('D, d M Y H:i:s') . ' +0000',
    'Message-ID: <' . bin2hex(random_bytes(12)) . '@dwoodline.com>',
    'From: D Woodline Website <' . INQUIRY_FROM . '>',
    'To: ' . INQUIRY_TO,
    'Reply-To: ' . $email,
    'Subject: ' . $subject,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: dwoodline-contact-form',
];

if ($smtpPass !== '') {
    // Authenticated SMTP through the studio mailbox: reliable delivery, and a failure is reported.
    $sent = smtpSend(INQUIRY_FROM, $smtpPass, INQUIRY_TO, implode("\r\n", $headerLines) . "\r\n\r\n" . $body);
} else {
    $plainHeaders = array_values(array_filter(
        $headerLines,
        static fn (string $h): bool => !str_starts_with($h, 'Subject:') && !str_starts_with($h, 'To:')
    ));
    $sent = @mail(INQUIRY_TO, $subject, $body, implode("\r\n", $plainHeaders), '-f' . INQUIRY_FROM);
}

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'send_failed']);
}

// Count only deliveries, so a failed send never uses up a visitor's quota.
$hits[] = $now;
@file_put_contents($bucket, json_encode($hits), LOCK_EX);

respond(200, ['ok' => true]);
