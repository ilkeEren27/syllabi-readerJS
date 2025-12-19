"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import { Button } from "@/components/ui/button";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

const UploadSyllabi = ({ onEventsExtracted }) => {
  const t = useTranslations("UploadComponent");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      let allExtractedEvents = [];

      for (const file of files) {
        let extractedText = "";

        if (
          file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          extractedText = result.value.trim();
        } else if (file.type === "application/pdf") {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            extractedText +=
              content.items.map((item) => item.str).join(" ") + "\n";
          }
        } else {
          throw new Error(t("unsupported"));
        }

        const res = await fetch("/api/extractDates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ syllabusText: extractedText }),
        });

        const data = await res.json();

        if (res.ok) {
          allExtractedEvents.push(...data); // Merge into one mega list
        } else {
          throw new Error(data.error || t("failedToExtract"));
        }
      }

      allExtractedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      onEventsExtracted(allExtractedEvents); // Send all events to parent
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold mb-2 text-gradient">
          {t("button")}
        </h3>
        <p className="text-sm text-muted-foreground">
          Upload PDF or DOCX files to extract calendar events
        </p>
      </div>
      <Button
        onClick={() => fileInputRef.current.click()}
        disabled={isLoading}
        className="h-12 px-8 text-base font-semibold gradient-primary hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        size="lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            {t("extracting")}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            📄 {t("button")}
          </span>
        )}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".docx,.pdf"
        multiple
      />
      {errorMessage && (
        <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm font-medium text-center">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadSyllabi;
