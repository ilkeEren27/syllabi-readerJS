"use client";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const EventEditor = ({ events, onUpdate, onDownload }) => {
  const t = useTranslations("EventEditor");
  const [editedEvents, setEditedEvents] = useState(events);

  useEffect(() => {
    setEditedEvents(events); // update if new events are passed in
  }, [events]);

  const handleChange = (index, field, value) => {
    const updated = [...editedEvents];
    updated[index][field] = value;
    setEditedEvents(updated);
    onUpdate(updated); // notify parent
  };

  const handleDelete = (index) => {
    const updated = [...editedEvents];
    updated.splice(index, 1);
    setEditedEvents(updated);
    onUpdate(updated);
  };

  const handleAdd = () => {
    const newEvent = {
      title: t("new"),
      date: "2025-01-01",
      description: "",
    };
    const updated = [...editedEvents, newEvent];
    setEditedEvents(updated);
    onUpdate(updated);
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
        {t("title")}
      </h2>
      <div className="space-y-5">
        {editedEvents.map((event, index) => (
          <div
            key={index}
            className="bg-card border border-border/50 rounded-2xl p-6 cozy-shadow hover:cozy-shadow-lg transition-all duration-300 space-y-4 relative group"
          >
            <Input
              type="text"
              className="w-full rounded-xl"
              value={event.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Event Title"
            />
            <Input
              type="date"
              className="w-full rounded-xl"
              value={event.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
              placeholder="YYYY-MM-DD"
            />
            <Input
              type="text"
              className="w-full rounded-xl"
              value={event.description || ""}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              placeholder={t("description")}
            />
            <Button
              onClick={() => handleDelete(index)}
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-4 right-4 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl",
                "opacity-0 group-hover:opacity-100 transition-all duration-300"
              )}
              title={t("delete")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-5 mt-8 flex-wrap">
        <Button
          onClick={handleAdd}
          variant="secondary"
          className="flex-1 min-w-[160px] h-12 rounded-2xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t("addNew")}
        </Button>

        <Button
          onClick={() => onDownload(editedEvents)}
          className="flex-1 min-w-[160px] h-12 gradient-primary hover:opacity-90 rounded-2xl transition-all duration-300 hover:scale-105 cozy-shadow-lg"
        >
          <Download className="h-5 w-5 mr-2" />
          {t("download")}
        </Button>
      </div>
    </div>
  );
};

export default EventEditor;
