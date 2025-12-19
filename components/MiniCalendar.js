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
      <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
        Calendar View
      </h2>
      <div className="flex justify-center">
        <div className="react-calendar-wrapper">
          <Calendar
            onClickDay={(value) => setSelectedDate(value)}
            tileContent={tileContent}
            className={cn(
              "bg-card border border-border rounded-lg p-4 shadow-sm",
              "react-calendar"
            )}
          />
        </div>
      </div>

      {selectedDate && (
        <div className="mt-6 p-4 bg-card border border-border rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            {t("events")} - {selectedDate.toDateString()}
          </h3>
          {eventsOnDate(selectedDate).length > 0 ? (
            <ul className="space-y-2">
              {eventsOnDate(selectedDate).map((event, idx) => (
                <li
                  key={idx}
                  className="p-3 bg-muted/50 rounded-lg border border-border"
                >
                  <strong className="text-primary font-semibold">
                    {event.title}
                  </strong>
                  {event.description && (
                    <span className="text-muted-foreground block mt-1">
                      {event.description}
                    </span>
                  )}
                  {!event.description && (
                    <span className="text-muted-foreground italic block mt-1">
                      {t("noDescription")}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic">
              No events scheduled for this date.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;
