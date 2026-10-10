"use client";

import { useEffect, useId, useRef, useState } from "react";

type ReportSightingDialogProps = {
  open: boolean;
  onClose: () => void;
  onUseMyLocation?: () => void;
  locationHint?: string | null;
};

const EVIDENCE = ["PHOTO", "TRAIL CAM", "WINDOW", "ROADSIDE", "OTHER"] as const;

function randomFileNumber() {
  const n = Math.floor(100 + Math.random() * 900);
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const a = letters[Math.floor(Math.random() * letters.length)];
  return `${a}${a}-${n}`;
}

export function ReportSightingDialog({
  open,
  onClose,
  onUseMyLocation,
  locationHint,
}: ReportSightingDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fileNumber, setFileNumber] = useState("");
  const [place, setPlace] = useState("");
  const [when, setWhen] = useState("");
  const [evidence, setEvidence] = useState<(typeof EVIDENCE)[number]>("PHOTO");
  const [story, setStory] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    setFileNumber("");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!locationHint) return;
    setPlace((current) => (current.trim() ? current : locationHint));
  }, [locationHint]);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFileNumber(randomFileNumber());
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[500] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-[#c41e3a]/50 bg-[#0b0708] shadow-[0_0_60px_rgba(196,30,58,0.25)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#c41e3a]/30 px-4 py-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] text-[#c41e3a]">UNOFFICIAL TIP LINE</p>
            <h2 id={titleId} className="font-display text-2xl text-[#f3e6c8]">
              Report a sighting
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/60 hover:text-[#f3e6c8]"
            aria-label="Close report form"
          >
            CLOSE
          </button>
        </div>

        {submitted ? (
          <div className="space-y-3 p-4">
            <p className="font-serif text-base text-[#f3e6c8]">File received. Probably.</p>
            <p className="font-serif text-sm leading-relaxed text-[#e8d5b5]/80">
              Your report has been stamped into the unauthorized archive as{" "}
              <span className="font-mono text-[#c41e3a]">{fileNumber}</span>. An archivist may review it
              between midnight and never. If the Visitor tips his hat at you, do not tip back unless you mean it.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full border border-[#c41e3a] bg-[#c41e3a]/20 px-4 py-2 font-mono text-[10px] tracking-[0.25em] text-[#f3e6c8] hover:bg-[#c41e3a]/30"
            >
              BACK TO MAP
            </button>
          </div>
        ) : (
          <form className="space-y-3 p-4" onSubmit={handleSubmit}>
            <p className="font-serif text-sm text-[#e8d5b5]/75">
              Fiction only. This form does not send email — it is a campfire log for your story. Be specific. Be weird.
              Be polite about the hat.
            </p>

            <label className="block space-y-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/55">WHERE</span>
              <input
                required
                value={place}
                onChange={(event) => setPlace(event.target.value)}
                placeholder="City, street, or crossroads"
                className="w-full border border-[#e8d5b5]/20 bg-[#12090b] px-3 py-2 font-serif text-sm text-[#f3e6c8] placeholder:text-[#e8d5b5]/35 focus:border-[#c41e3a]/60 focus:outline-none"
              />
            </label>

            {onUseMyLocation ? (
              <button
                type="button"
                onClick={onUseMyLocation}
                className="border border-[#3b82f6]/50 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#9ec0ff] hover:bg-[#3b82f6]/10"
              >
                USE MY LOCATION (BLUE DOT)
              </button>
            ) : null}

            <label className="block space-y-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/55">WHEN</span>
              <input
                required
                value={when}
                onChange={(event) => setWhen(event.target.value)}
                placeholder="Date and time, or last night around…"
                className="w-full border border-[#e8d5b5]/20 bg-[#12090b] px-3 py-2 font-serif text-sm text-[#f3e6c8] placeholder:text-[#e8d5b5]/35 focus:border-[#c41e3a]/60 focus:outline-none"
              />
            </label>

            <fieldset className="space-y-2">
              <legend className="font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/55">EVIDENCE</legend>
              <div className="flex flex-wrap gap-2">
                {EVIDENCE.map((kind) => (
                  <label key={kind} className="cursor-pointer">
                    <input
                      type="radio"
                      name="evidence"
                      value={kind}
                      checked={evidence === kind}
                      onChange={() => setEvidence(kind)}
                      className="peer sr-only"
                    />
                    <span className="block border border-[#e8d5b5]/20 px-2 py-1 font-mono text-[9px] tracking-[0.15em] text-[#e8d5b5]/70 peer-checked:border-[#c41e3a] peer-checked:bg-[#c41e3a]/15 peer-checked:text-[#f3e6c8]">
                      {kind}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block space-y-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/55">WHAT HAPPENED</span>
              <textarea
                required
                rows={5}
                value={story}
                onChange={(event) => setStory(event.target.value)}
                placeholder="Upright cat. Tall hat. Trampoline. You know the type."
                className="w-full resize-y border border-[#e8d5b5]/20 bg-[#12090b] px-3 py-2 font-serif text-sm text-[#f3e6c8] placeholder:text-[#e8d5b5]/35 focus:border-[#c41e3a]/60 focus:outline-none"
              />
            </label>

            <label className="block space-y-1">
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/55">CONTACT (OPTIONAL)</span>
              <input
                type="text"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                placeholder="Email or porch light color"
                className="w-full border border-[#e8d5b5]/20 bg-[#12090b] px-3 py-2 font-serif text-sm text-[#f3e6c8] placeholder:text-[#e8d5b5]/35 focus:border-[#c41e3a]/60 focus:outline-none"
                autoComplete="email"
              />
            </label>

            <button
              type="submit"
              className="w-full border border-[#c41e3a] bg-[#c41e3a]/25 px-4 py-2.5 font-mono text-[10px] tracking-[0.3em] text-[#f3e6c8] hover:bg-[#c41e3a]/35"
            >
              SUBMIT TO ARCHIVE
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
