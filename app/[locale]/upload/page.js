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
      <section className="flex-grow px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <UploadSyllabi onEventsExtracted={setEvents} />
          </div>
        </div>

        {events.length > 0 && (
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-lg">
              <EventEditor
                events={events}
                onUpdate={setEvents}
                onDownload={handleDownloadICS}
              />
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 shadow-lg">
              <MiniCalendar events={events} />
            </div>
          </div>
        )}
      </section>
      <footer className="mt-auto py-8 border-t border-border bg-card/50">
        <div className="flex flex-col items-center gap-6 px-6">
          <Button
            asChild
            variant="outline"
            className="h-12 w-60 text-lg font-semibold"
          >
            <Link href="/">{t("return")}</Link>
          </Button>
          <div className="flex justify-center items-center gap-2 text-base lg:text-lg flex-wrap">
            <span className="text-muted-foreground">{t("footer")}</span>
            <Link
              href="https://ilkeeren.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary font-medium transition-colors hover:underline"
            >
              Eren
            </Link>
            <span className="text-muted-foreground">&</span>
            <Link
              href="https://www.linkedin.com/in/hassan-syed/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-secondary font-medium transition-colors hover:underline"
            >
              Hassan
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
