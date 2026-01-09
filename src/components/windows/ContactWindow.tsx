import { Instagram, Youtube, Mail, ExternalLink } from 'lucide-react';
import { socialLinks } from '@/data/projects';

const MAILTO_LINK = 'mailto:cameronkaul12@gmail.com?subject=Project%20Inquiry&body=Hi%20Cam%2C%0A%0AI%27d%20love%20to%20discuss%20a%20project%20with%20you.%0A%0ABest%2C';

export function openContactEmail() {
  window.location.href = MAILTO_LINK;
}

export function ContactWindow() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[300px] space-y-6">
      <div className="text-center space-y-2">
        <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
        <h1 className="text-2xl font-bold">Get in Touch</h1>
        <p className="text-sm text-muted-foreground max-w-xs">
          Ready to create something amazing? Send me an email and let's talk.
        </p>
      </div>

      {/* Primary CTA */}
      <a
        href={MAILTO_LINK}
        className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl text-base font-medium hover:opacity-90 transition shadow-lg"
      >
        <Mail className="w-5 h-5" />
        Email Cam
        <ExternalLink className="w-4 h-4 ml-1 opacity-60" />
      </a>

      <p className="text-xs text-muted-foreground">cameronkaul12@gmail.com</p>

      {/* Social Links */}
      <div className="flex justify-center gap-4 pt-4 border-t border-border/50 w-full max-w-xs">
        <a 
          href={socialLinks.instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-muted rounded-lg transition"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a 
          href={socialLinks.youtube} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-2 hover:bg-muted rounded-lg transition"
        >
          <Youtube className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
