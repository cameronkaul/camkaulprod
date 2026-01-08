import { useState } from 'react';
import { socialLinks } from '@/data/projects';
import { Instagram, Youtube, Mail, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export function ContactWindow() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    toast.success('Email copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! (Demo only)');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold">Get in Touch</h1>
        <p className="text-sm text-muted-foreground">Let's create something amazing together.</p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-ring"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-ring"
          required
        />
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 bg-muted rounded-lg text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          required
        />
        <button type="submit" className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition">
          Send Message
        </button>
      </form>

      {/* Email Copy */}
      <button onClick={copyEmail} className="w-full flex items-center justify-center gap-2 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {socialLinks.email}
      </button>

      {/* Social Links */}
      <div className="flex justify-center gap-4">
        <a href={socialLinks.instagram} className="p-2 hover:bg-muted rounded-lg transition"><Instagram className="w-5 h-5" /></a>
        <a href={socialLinks.youtube} className="p-2 hover:bg-muted rounded-lg transition"><Youtube className="w-5 h-5" /></a>
        <a href={socialLinks.vimeo} className="p-2 hover:bg-muted rounded-lg transition"><Mail className="w-5 h-5" /></a>
      </div>
    </div>
  );
}
