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
      <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
        {t("title")}
      </h2>
      <div className="space-y-4">
        {editedEvents.map((event, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-3 relative group"
          >
            <Input
              type="text"
              className="w-full"
              value={event.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              placeholder="Event Title"
            />
            <Input
              type="date"
              className="w-full"
              value={event.date}
              onChange={(e) => handleChange(index, "date", e.target.value)}
              placeholder="YYYY-MM-DD"
            />
            <Input
              type="text"
              className="w-full"
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
                "absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10",
                "opacity-0 group-hover:opacity-100 transition-opacity"
              )}
              title={t("delete")}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-4 mt-6 flex-wrap">
        <Button
          onClick={handleAdd}
          variant="secondary"
          className="flex-1 min-w-[140px]"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addNew")}
        </Button>

        <Button
          onClick={() => onDownload(editedEvents)}
          className="flex-1 min-w-[140px] gradient-primary hover:opacity-90"
        >
          <Download className="h-4 w-4 mr-2" />
          {t("download")}
        </Button>
      </div>
    </div>
  );
};

export default EventEditor;
