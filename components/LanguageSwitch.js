"use client";
import { usePathname, useRouter } from "@/app/i18n/navigation";
import { routing } from "@/app/i18n/routing";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ className }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  return (
    <select
      className={cn(
        "border border-input bg-background rounded-lg px-3 py-2 w-28",
        "text-sm font-medium transition-all duration-200",
        "hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')] bg-no-repeat bg-right-2 pr-8",
        className
      )}
      value={locale}
      onChange={(e) => router.replace(pathname, { locale: e.target.value })}
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
