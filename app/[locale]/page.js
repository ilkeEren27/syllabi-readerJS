import { useTranslations } from "next-intl";
import { Link } from "@/app/i18n/navigation";
import { Button } from "@/components/ui/button";

import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const t = useTranslations("Homepage");
  return (
    <main className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 transition-colors">
        <h1 className="text-2xl font-bold min-h-[2.5rem] flex items-center">
          <Link href="/" className="whitespace-nowrap text-gradient font-extrabold hover:opacity-80 transition-opacity">
            Syllabi-Reader
          </Link>
        </h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitch className="w-28" />
        </div>
      </header>
      <section className="flex flex-col items-center justify-center flex-grow px-6 py-12">
        {/* Hero Section */}
        <div className="w-full max-w-4xl mx-auto text-center mb-16">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl rounded-full"></div>
            <h2 className="relative text-4xl lg:text-5xl font-extrabold mb-6 bg-clip-text text-transparent gradient-primary">
              {t("title")}
            </h2>
          </div>
          <p className="mx-auto text-lg lg:text-xl max-w-3xl text-center [text-wrap:balance] leading-relaxed text-muted-foreground">
            {t("description")}
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <Button
            asChild
            className="h-14 w-72 text-lg font-semibold gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            size="lg"
          >
            <Link href="/upload">{t("button")}</Link>
          </Button>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-5xl mx-auto mt-16">
          <h2 className="text-center text-3xl lg:text-4xl font-bold mb-12 text-gradient">
            {t("goals")}
          </h2>
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-center break-words md:text-justify text-lg lg:text-xl leading-relaxed text-foreground">
              {t("features")}
            </p>
          </div>
        </div>
      </section>
      <footer className="mt-auto py-8 border-t border-border bg-card/50">
        <div className="flex justify-center items-center gap-2 text-base lg:text-lg flex-wrap px-6">
          <span className="text-muted-foreground">{t("footer")}</span>
          <a
            href="https://ilkeeren.dev"
            target="_blank"
            rel="noopener"
            className="text-primary hover:text-secondary font-medium transition-colors hover:underline"
          >
            Eren
          </a>
          <span className="text-muted-foreground">&</span>
          <a
            href="https://www.linkedin.com/in/hassan-syed/"
            target="_blank"
            rel="noopener"
            className="text-primary hover:text-secondary font-medium transition-colors hover:underline"
          >
            Hassan
          </a>
        </div>
      </footer>
    </main>
  );
}
