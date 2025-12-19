import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Button } from "@/components/ui/button";

import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const t = useTranslations("Homepage");
  return (
    <main className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-8 py-6 border-b border-border/50 bg-background sticky top-0 z-50 transition-all duration-500">
        <h1 className="text-2xl font-bold min-h-[2.5rem] flex items-center">
          <Link href="/" className="whitespace-nowrap text-gradient font-extrabold hover:opacity-80 transition-opacity duration-300">
            Syllabi-Reader
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitch className="w-28" />
        </div>
      </header>
      <section className="flex flex-col items-center justify-center flex-grow px-8 py-16">
        {/* Hero Section */}
        <div className="w-full max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-extrabold mb-8 text-gradient leading-tight">
            {t("title")}
          </h2>
          <p className="mx-auto text-lg lg:text-xl max-w-3xl text-center [text-wrap:balance] leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-20">
          <Button
            asChild
            className="h-16 w-80 text-lg font-semibold gradient-primary hover:opacity-90 transition-all duration-500 cozy-shadow-lg hover:cozy-shadow-lg transform hover:scale-105 rounded-2xl"
            size="lg"
          >
            <Link href="/upload">{t("button")}</Link>
          </Button>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-5xl mx-auto mt-20">
          <h2 className="text-center text-3xl lg:text-5xl font-bold mb-16 text-gradient">
            {t("goals")}
          </h2>
          <div className="bg-card border border-border/50 rounded-3xl p-10 lg:p-16 cozy-shadow-lg hover:cozy-shadow-lg transition-all duration-500">
            <p className="text-center break-words md:text-justify text-lg lg:text-xl leading-relaxed text-foreground">
              {t("features")}
            </p>
          </div>
        </div>
      </section>
      <footer className="mt-auto py-10 border-t border-border/50 bg-card/60">
        <div className="flex justify-center items-center gap-3 text-base lg:text-lg flex-wrap px-8">
          <span className="text-muted-foreground">{t("footer")}</span>
          <a
            href="https://ilkeeren.dev"
            target="_blank"
            rel="noopener"
            className="text-primary hover:text-accent font-medium transition-colors duration-300 hover:underline"
          >
            Eren
          </a>
          <span className="text-muted-foreground">&</span>
          <a
            href="https://www.linkedin.com/in/hassan-syed/"
            target="_blank"
            rel="noopener"
            className="text-primary hover:text-accent font-medium transition-colors duration-300 hover:underline"
          >
            Hassan
          </a>
        </div>
      </footer>
    </main>
  );
}
