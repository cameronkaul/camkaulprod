import { Instagram, Youtube, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { socialLinks } from '@/data/projects';
import camProfile from '@/assets/cam-profile.jpg';

const MAILTO_LINK = 'mailto:cameronkaul12@gmail.com?subject=Project%20Inquiry&body=Hi%20Cam%2C%0A%0AI%27d%20love%20to%20discuss%20a%20project%20with%20you.%0A%0ABest%2C';

export function openContactEmail() {
  window.location.href = MAILTO_LINK;
}

export function ContactWindow() {
  return (
    <div className="flex h-full bg-[hsl(220,15%,8%)]">
      {/* Contacts-style Left Column - Contact List */}
      <div className="w-56 bg-[hsl(220,15%,10%)] border-r border-border/30 flex flex-col">
        {/* Search */}
        <div className="p-3 border-b border-border/30">
          <div className="px-3 py-1.5 bg-muted/30 rounded-md text-sm text-muted-foreground">
            Search
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          {/* Group header */}
          <div className="px-3 py-2 bg-muted/20 border-b border-border/30">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">C</span>
          </div>
          
          {/* Single contact entry - selected */}
          <button className="w-full text-left p-3 bg-primary/20 border-l-2 border-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-muted">
              <img 
                src={camProfile} 
                alt="Cam Kaul" 
                className="w-full h-full object-cover scale-150 object-[center_15%]"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">Cam Kaul</p>
              <p className="text-xs text-muted-foreground">Videographer</p>
            </div>
          </button>
        </div>

        {/* Count */}
        <div className="p-3 border-t border-border/30 text-center">
          <span className="text-xs text-muted-foreground">1 Contact</span>
        </div>
      </div>

      {/* Right Column - Contact Card */}
      <div className="flex-1 flex flex-col">
        {/* Contact Card Content */}
        <div className="flex-1 overflow-auto custom-scrollbar p-8">
          <div className="max-w-md mx-auto">
            {/* Profile Picture & Name */}
            <div className="text-center mb-8">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-border/30 shadow-xl">
                <img 
                  src={camProfile} 
                  alt="Cam Kaul" 
                  className="w-full h-full object-cover scale-150 object-[center_15%]"
                />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Cam Kaul</h1>
              <p className="text-muted-foreground">Videographer & Editor</p>
            </div>

            {/* Primary Action - Email */}
            <a
              href={MAILTO_LINK}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-base font-medium hover:bg-primary/90 transition shadow-lg mb-6"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </a>

            {/* Contact Details Card */}
            <div className="bg-muted/20 rounded-xl border border-border/30 overflow-hidden mb-6">
              {/* Email */}
              <a 
                href={MAILTO_LINK}
                className="flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors border-b border-border/30"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">email</p>
                  <p className="text-sm text-primary">cameronkaul12@gmail.com</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 px-4 py-3 border-b border-border/30">
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">location</p>
                  <p className="text-sm text-foreground">Waco, Texas</p>
                </div>
              </div>

              {/* Work */}
              <div className="flex items-center gap-4 px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">work</p>
                  <p className="text-sm text-foreground">Cam Kaul Productions</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-muted/20 rounded-xl border border-border/30 overflow-hidden">
              <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border/30">
                Social
              </p>
              
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors border-b border-border/30"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Instagram</p>
                  <p className="text-xs text-muted-foreground">@camkaulproductions</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
              
              <a 
                href={socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <Youtube className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">YouTube</p>
                  <p className="text-xs text-muted-foreground">Cam Kaul</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
