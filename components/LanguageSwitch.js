"use client";
import { usePathname, useRouter } from "@/app/i18n/navigation";
import { routing } from "@/app/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher({ className }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (newLocale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-9 w-28 justify-between px-3 rounded-xl",
          "transition-all duration-300",
          "hover:border-ring focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
      >
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{locale.toUpperCase()}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </Button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 right-0 w-32 z-50",
            "bg-card border border-border/50 rounded-xl",
            "cozy-shadow-lg overflow-hidden"
          )}
          style={{
            animation: "fadeIn 0.2s ease-out, slideDown 0.2s ease-out",
          }}
        >
          <div className="py-1.5">
            {routing.locales.map((l) => (
              <button
                key={l}
                onClick={() => handleSelect(l)}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm font-medium",
                  "transition-all duration-200 rounded-lg mx-1",
                  "hover:bg-muted/60 active:bg-muted/80",
                  locale === l && "bg-primary/15 text-primary font-semibold"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="h-3.5 w-3.5" />
                  <span>{l.toUpperCase()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
