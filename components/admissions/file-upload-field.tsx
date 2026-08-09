"use client";

import * as React from "react";
import { UploadCloud, FileCheck2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadFieldProps {
  id: string;
  label: string;
  hint: string;
  accept: string;
  error?: string;
  onFileSelect: (file: File | null) => void;
}

export function FileUploadField({
  id,
  label,
  hint,
  accept,
  error,
  onFileSelect,
}: FileUploadFieldProps) {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    setFileName(file?.name ?? null);
    onFileSelect(file);
  };

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          const file = e.dataTransfer.files?.[0] ?? null;
          handleFile(file);
          if (file && inputRef.current) {
            const dt = new DataTransfer();
            dt.items.add(file);
            inputRef.current.files = dt.files;
          }
        }}
        className={cn(
          "mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors",
          dragActive ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20" : "border-input",
          error && "border-red-500"
        )}
        onClick={() => inputRef.current?.click()}
      >
        {fileName ? (
          <>
            <FileCheck2 className="h-6 w-6 text-emerald-600" aria-hidden="true" />
            <p className="max-w-full truncate text-xs font-medium text-foreground">
              {fileName}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFile(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:underline"
            >
              <X className="h-3 w-3" /> Remove
            </button>
          </>
        ) : (
          <>
            <UploadCloud className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-[11px] text-muted-foreground">{hint}</p>
          </>
        )}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          aria-invalid={!!error}
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}
