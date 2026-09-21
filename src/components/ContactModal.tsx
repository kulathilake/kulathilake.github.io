import React, { useState } from 'react';
import { Check, Copy, Mail, Send, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const emailAddress = 'ShehanHere@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setSenderName('');
      setSenderEmail('');
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-[1px] animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-[#f7f6f1] border border-[#d6d4cb] shadow-lg p-6 sm:p-8 font-serif relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#666666] hover:text-black transition-colors focus:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-[#111111] mb-2 tracking-tight">
          Contact Shehan Kulathilake
        </h2>
        <p className="text-[14.5px] font-sans text-[#555555] mb-6">
          Feel free to reach out regarding collaborations, research inquiries, or questions about the notes.
        </p>

        {/* Direct Email Pill */}
        <div className="flex items-center justify-between p-3 mb-6 bg-[#eceae2] border border-[#dbd8cf] rounded-[2px] font-sans text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[#333333]">
            <Mail className="w-4 h-4 text-[#666666]" />
            <a
              href={`mailto:${emailAddress}`}
              className="font-mono hover:underline hover:text-black"
            >
              {emailAddress}
            </a>
          </div>
          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#faf9f5] hover:bg-white border border-[#ccc9bf] rounded text-xs text-[#222222] transition-colors focus:outline-none"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {sent ? (
          <div className="py-8 text-center font-sans space-y-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-[#222222] font-medium text-[15px]">
              Note dispatched successfully!
            </p>
            <p className="text-xs text-[#666666]">
              Thank you for reaching out. I will respond as soon as possible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
            <div>
              <label className="block text-[#444444] mb-1 font-medium">Your Name</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Dr. / Prof. / Alex Doe"
                className="w-full px-3 py-2 bg-[#faf9f5] border border-[#d6d4cb] focus:border-black rounded-[2px] text-[#222222] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#444444] mb-1 font-medium">Your Email</label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="you@institution.edu"
                className="w-full px-3 py-2 bg-[#faf9f5] border border-[#d6d4cb] focus:border-black rounded-[2px] text-[#222222] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#444444] mb-1 font-medium">Message</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your note or question here..."
                className="w-full px-3 py-2 bg-[#faf9f5] border border-[#d6d4cb] focus:border-black rounded-[2px] text-[#222222] focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[#555555] hover:text-black transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#1c1c1c] hover:bg-black text-[#faf9f5] rounded-[2px] transition-colors focus:outline-none cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Note</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
