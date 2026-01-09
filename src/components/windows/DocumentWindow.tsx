import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, Printer } from 'lucide-react';

export function DocumentWindow() {
  return (
    <div className="h-full flex flex-col bg-muted/60">
      {/* Fake Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 bg-muted border-b border-border/50">
        <div className="flex items-center gap-0.5 mr-2">
          <button className="p-1.5 rounded hover:bg-muted-foreground/10 text-muted-foreground">
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted-foreground/10 text-muted-foreground">
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted-foreground/10 text-muted-foreground">
            <Underline className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="w-px h-4 bg-border/50" />
        <div className="flex items-center gap-0.5 mx-2">
          <button className="p-1.5 rounded hover:bg-muted-foreground/10 text-muted-foreground">
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted-foreground/10 text-muted-foreground">
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted-foreground/10 text-muted-foreground">
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="w-px h-4 bg-border/50" />
        <div className="flex items-center gap-0.5 mx-2">
          <button className="p-1.5 rounded hover:bg-muted-foreground/10 text-muted-foreground">
            <List className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-muted-foreground/10 text-muted-foreground">
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex-1" />
        <select className="text-xs bg-background border border-border/50 rounded px-2 py-1 text-muted-foreground">
          <option>Arial</option>
        </select>
        <select className="text-xs bg-background border border-border/50 rounded px-2 py-1 text-muted-foreground ml-1">
          <option>12</option>
        </select>
      </div>

      {/* Document Area */}
      <div className="flex-1 overflow-auto p-8 flex justify-center">
        {/* Paper Page */}
        <div 
          className="bg-white w-full max-w-[550px] min-h-[700px] shadow-lg rounded-sm flex items-center justify-center"
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Centered Content */}
          <div className="text-center px-12 py-8 text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
            <p className="text-lg leading-relaxed mb-6">
              Nothing important in here.
            </p>
            <p className="text-base leading-relaxed mb-6">
              Unless you are a brand or an artist or a company that is looking to make content.
              <br />
              In that case, hmu twin, and we will make something clean.
            </p>
            <a 
              href="mailto:cameronkaul12@gmail.com"
              className="text-base text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              cameronkaul12@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
