"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Calendar from "react-calendar";
import { cn } from "@/lib/utils";
import "react-calendar/dist/Calendar.css";

const MiniCalendar = ({ events }) => {
  const t = useTranslations("MiniCalendar");
  const [selectedDate, setSelectedDate] = useState(null);

  const getEventDates = () => {
    return events.map((event) => event.date);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const iso = date.toISOString().split("T")[0];
      const hasEvent = getEventDates().includes(iso);
      return hasEvent ? (
        <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-1" />
      ) : null;
    }
  };

  const eventsOnDate = (date) => {
    const iso = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === iso);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
        Calendar View
      </h2>
      <div className="flex justify-center mb-6">
        <div className="react-calendar-wrapper">
          <Calendar
            onClickDay={(value) => setSelectedDate(value)}
            tileContent={tileContent}
            className={cn(
              "bg-card border border-border/50 rounded-2xl p-6 cozy-shadow",
              "react-calendar"
            )}
          />
        </div>
      </div>

      {selectedDate && (
        <div className="mt-8 p-6 bg-card border border-border/50 rounded-2xl cozy-shadow">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            {t("events")} - {selectedDate.toDateString()}
          </h3>
          {eventsOnDate(selectedDate).length > 0 ? (
            <ul className="space-y-3">
              {eventsOnDate(selectedDate).map((event, idx) => (
                <li
                  key={idx}
                  className="p-4 bg-muted/50 rounded-xl border border-border/50 cozy-shadow hover:cozy-shadow transition-all duration-300"
                >
                  <strong className="text-primary font-semibold text-lg">
                    {event.title}
                  </strong>
                  {event.description && (
                    <span className="text-muted-foreground block mt-2">
                      {event.description}
                    </span>
                  )}
                  {!event.description && (
                    <span className="text-muted-foreground italic block mt-2">
                      {t("noDescription")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic text-lg">
              No events scheduled for this date.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;
