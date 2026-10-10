"use client";

import { useEffect, useId } from "react";
import { LATEST_UPDATE } from "@/lib/latest-update";

type LatestUpdateDialogProps = {
  open: boolean;
  onClose: () => void;
  onOpenOnMap?: () => void;
};

export function LatestUpdateDialog({ open, onClose, onOpenOnMap }: LatestUpdateDialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-[#c41e3a]/50 bg-[#0b0708] shadow-[0_0_60px_rgba(196,30,58,0.25)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#c41e3a]/30 px-4 py-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] text-[#c41e3a]">LATEST UPDATE · {LATEST_UPDATE.fileNumber}</p>
            <h2 id={titleId} className="font-display text-2xl text-[#f3e6c8]">
              {LATEST_UPDATE.headline}
            </h2>
            <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/55">
              {LATEST_UPDATE.date} · {LATEST_UPDATE.time}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/60 hover:text-[#f3e6c8]"
            aria-label="Close latest update"
          >
            CLOSE
          </button>
        </div>

        <div className="space-y-4 p-4">
          <p className="font-serif text-base text-[#f3e6c8]">{LATEST_UPDATE.summary}</p>
          {LATEST_UPDATE.body.map((paragraph) => (
            <p key={paragraph} className="font-serif text-sm leading-relaxed text-[#e8d5b5]/80">
              {paragraph}
            </p>
          ))}
          <ul className="space-y-1 border-t border-[#e8d5b5]/10 pt-3">
            {LATEST_UPDATE.bullets.map((item) => (
              <li key={item} className="flex gap-2 font-serif text-sm text-[#e8d5b5]/80">
                <span className="text-[#c41e3a]" aria-hidden="true">▣</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 pt-2">
            {onOpenOnMap ? (
              <button
                type="button"
                onClick={() => {
                  onOpenOnMap();
                  onClose();
                }}
                className="border border-[#e8d5b5]/25 px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/80 hover:border-[#c41e3a]/60"
              >
                SHOW ON MAP
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="border border-[#c41e3a] bg-[#c41e3a]/20 px-3 py-2 font-mono text-[10px] tracking-[0.25em] text-[#f3e6c8] hover:bg-[#c41e3a]/30"
            >
              BACK TO MAP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
