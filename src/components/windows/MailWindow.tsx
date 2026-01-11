import { Mail, Send } from 'lucide-react';

const MAILTO_LINK = 'mailto:cameronkaul12@gmail.com?subject=Project%20Inquiry';
const EMAIL_ADDRESS = 'cameronkaul12@gmail.com';

export function MailWindow() {
  const handleSendEmail = () => {
    window.location.href = MAILTO_LINK;
  };

  return (
    <div className="flex h-full bg-[hsl(220,15%,8%)]">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-sm w-full text-center">
          {/* Mail Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Mail className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2">New Message</h1>
          <p className="text-muted-foreground mb-8">Start a conversation with Cam</p>

          {/* Primary Action */}
          <button
            onClick={handleSendEmail}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl text-base font-medium hover:bg-primary/90 transition shadow-lg mb-4"
          >
            <Send className="w-5 h-5" />
            Compose Email
          </button>

          {/* Email Address */}
          <a
            href={MAILTO_LINK}
            className="text-sm text-primary hover:underline"
          >
            {EMAIL_ADDRESS}
          </a>
        </div>
      </div>
    </div>
  );
}
