import React, { useState, useEffect, useRef } from "react";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setVerified(sessionStorage.getItem("sy_age_verified") === "true");
  }, []);

  useEffect(() => {
    if (verified === false) {
      // Focus the main CTA immediately
      yesButtonRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          const focusables = [yesButtonRef.current, noLinkRef.current];
          const first = focusables[0];
          const last = focusables[1];

          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === first) {
              last?.focus();
              e.preventDefault();
            }
          } else {
            // Tab
            if (document.activeElement === last) {
              first?.focus();
              e.preventDefault();
            }
          }
        } else if (e.key === "Escape") {
          // Block escape key from closing the dialog
          e.preventDefault();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [verified]);

  const confirm = () => {
    sessionStorage.setItem("sy_age_verified", "true");
    setVerified(true);
  };

  if (verified === null) return null; // avoid flash of content before check
  if (verified) return <>{children}</>;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="age-gate-title"
      ref={containerRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-forest/80 backdrop-blur-md p-4"
    >
      <div className="bg-cream text-forest p-10 rounded-[32px] max-w-md w-full text-center border border-forest/10 shadow-2xl relative overflow-hidden">
        {/* Background Decorative glow */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo icon */}
          <div className="w-16 h-16 bg-forest text-cream rounded-2xl flex items-center justify-center mb-6 shadow-md border border-forest/5">
            <span className="text-3xl">🌿</span>
          </div>

          <h2 id="age-gate-title" className="font-serif text-3xl font-black text-forest tracking-tight mb-3">
            Are you 18 or older?
          </h2>
          <p className="mb-8 text-sm text-forest/70 font-medium leading-relaxed max-w-xs">
            You must be of legal age (18+) to view our premium cannabis products and accessories.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button 
              ref={yesButtonRef}
              onClick={confirm} 
              className="flex-1 px-6 py-4 bg-forest hover:bg-forest/90 text-cream font-bold rounded-2xl shadow-lg shadow-forest/10 hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs uppercase tracking-widest active:translate-y-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
            >
              Yes, I'm 18+
            </button>
            <a 
              ref={noLinkRef}
              href="https://www.google.com" 
              className="flex-1 px-6 py-4 bg-transparent border border-forest/20 hover:border-forest hover:bg-forest/5 text-forest font-bold rounded-2xl transition-all text-xs uppercase tracking-widest text-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brass"
            >
              No, exit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
