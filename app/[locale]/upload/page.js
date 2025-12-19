"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/app/i18n/navigation";
import { useTranslations } from "next-intl";

import UploadSyllabi from "@/components/UploadSyllabi";
import EventEditor from "@/components/EventEditor";
import MiniCalendar from "@/components/MiniCalendar";
import LanguageSwitch from "@/components/LanguageSwitch";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePage() {
  const t = useTranslations("UploadPage");
  const [events, setEvents] = useState([]);

  const handleDownloadICS = async (finalEvents) => {
    const res = await fetch("/api/generateICS", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: finalEvents }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "syllabus-calendar.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

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
      <section className="flex-grow px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <div className="bg-card border border-border/50 rounded-3xl p-10 cozy-shadow-lg">
            <UploadSyllabi onEventsExtracted={setEvents} />
          </div>
        </div>

        {events.length > 0 && (
          <div className="space-y-10">
            <div className="bg-card border border-border/50 rounded-3xl p-8 lg:p-10 cozy-shadow-lg">
              <EventEditor
                events={events}
                onUpdate={setEvents}
                onDownload={handleDownloadICS}
              />
            </div>
            <div className="bg-card border border-border/50 rounded-3xl p-8 lg:p-10 cozy-shadow-lg">
              <MiniCalendar events={events} />
            </div>
          </div>
        )}
      </section>
      <footer className="mt-auto py-10 border-t border-border/50 bg-card/60">
        <div className="flex flex-col items-center gap-8 px-8">
          <Button
            asChild
            variant="outline"
            className="h-14 w-64 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/">{t("return")}</Link>
          </Button>
          <div className="flex justify-center items-center gap-3 text-base lg:text-lg flex-wrap">
            <span className="text-muted-foreground">{t("footer")}</span>
            <Link
              href="https://ilkeeren.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent font-medium transition-colors duration-300 hover:underline"
            >
              Eren
            </Link>
            <span className="text-muted-foreground">&</span>
            <Link
              href="https://www.linkedin.com/in/hassan-syed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-accent font-medium transition-colors duration-300 hover:underline"
            >
              Hassan
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
