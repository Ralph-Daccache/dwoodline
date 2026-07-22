import { useState } from 'react';
import type { FormEvent } from 'react';
import { submitInquiry } from '@/services/inquiryService';

/** The original `<form class="space-y-12">` from 05-inquiry.html, converted to a controlled form. */
export function InquiryForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await submitInquiry({ name, email, message });
    window.alert(result.message);
    if (result.ok) {
      setName('');
      setEmail('');
      setMessage('');
    }
  }

  return (
    <form className="space-y-12" onSubmit={handleSubmit}>
      <div className="group">
        <label className="font-technical-label text-technical-label uppercase tracking-widest text-[#F5F5F7]/40 block mb-2">
          Principal Name
        </label>
        <input
          className="w-full bg-transparent border-0 border-b border-[#F5F5F7]/20 py-4 font-body-md text-[#F5F5F7] placeholder:text-[#F5F5F7]/10 transition-all duration-300 form-input-focus"
          placeholder="Your Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="group">
        <label className="font-technical-label text-technical-label uppercase tracking-widest text-[#F5F5F7]/40 block mb-2">
          Electronic Mail
        </label>
        <input
          className="w-full bg-transparent border-0 border-b border-[#F5F5F7]/20 py-4 font-body-md text-[#F5F5F7] placeholder:text-[#F5F5F7]/10 transition-all duration-300 form-input-focus"
          placeholder="email@address.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="group">
        <label className="font-technical-label text-technical-label uppercase tracking-widest text-[#F5F5F7]/40 block mb-2">
          Project Brief
        </label>
        <textarea
          className="w-full bg-transparent border-0 border-b border-[#F5F5F7]/20 py-4 font-body-md text-[#F5F5F7] placeholder:text-[#F5F5F7]/10 transition-all duration-300 form-input-focus resize-none"
          placeholder="Describe the architectural intent..."
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="pt-8">
        <button
          className="w-full md:w-auto px-16 py-6 bg-[#F5F5F7] text-[#1A1A1A] font-technical-label text-technical-label uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#dec2a0] hover:text-[#1A1A1A]"
          type="submit"
        >
          Dispatch Inquiry
        </button>
      </div>
    </form>
  );
}
