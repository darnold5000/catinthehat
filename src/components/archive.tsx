"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLiveLocation, type LocationStatus } from "@/lib/geolocation";
import {
  COLUMBUS_GA_CLUSTER,
  COLUMBUS_GA_CENTER,
  COLUMBUS_GA_ZOOM,
  FLORIDA_RUN,
  FLORIDA_RUN_CENTER,
  FLORIDA_RUN_ZOOM,
  PORTRAIT_SRC,
  SIGHTINGS,
  TENNESSEE_CENTER,
  TENNESSEE_ZOOM,
  US_CENTER,
  US_ZOOM,
  YOU_ARE_HERE_ZOOM,
  type Sighting,
} from "@/lib/sightings";

type MapView = "tennessee" | "columbus-ga" | "florida-run" | "us";

const SightingsMap = dynamic(() => import("@/components/sightings-map"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

const KIND_LABEL: Record<Sighting["kind"], string> = {
  photo: "PHOTO",
  "trail-cam": "TRAIL CAM",
  window: "WINDOW",
  roadside: "ROADSIDE",
};

function clusterChip(sighting: Sighting): string {
  if (sighting.cluster === "florida-run") return "THE DRIVE";
  if (sighting.cluster === "columbus-ga") return "COLUMBUS GA";
  if (sighting.cluster === "nashville-south") return "TENNESSEE";
  return sighting.state;
}

function hereLabel(status: LocationStatus): string {
  if (status === "live") return "YOU ARE HERE · LIVE";
  if (status === "locating") return "LOCATING YOU…";
  if (status === "denied") return "LOCATION BLOCKED";
  return "GPS UNAVAILABLE";
}

function MapSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0b0708] text-[11px] tracking-[0.35em] text-[#e8d5b5]/50">
      UNFOLDING THE MAP…
    </div>
  );
}

export function Archive() {
  const [selectedId, setSelectedId] = useState("inlet-beach");
  const [view, setView] = useState<MapView>("florida-run");
  const [mapTarget, setMapTarget] = useState<{ center: [number, number]; zoom: number }>({
    center: FLORIDA_RUN_CENTER,
    zoom: FLORIDA_RUN_ZOOM,
  });
  const { coords: youAreHere, status: hereStatus, requestLocation } = useLiveLocation();
  const flyHereWhenReady = useRef(false);

  const selected = useMemo(
    () => SIGHTINGS.find((s) => s.id === selectedId) ?? SIGHTINGS[0],
    [selectedId],
  );

  useEffect(() => {
    if (!flyHereWhenReady.current || !youAreHere) return;
    flyHereWhenReady.current = false;
    setMapTarget({ center: youAreHere, zoom: YOU_ARE_HERE_ZOOM });
  }, [youAreHere]);

  function goToYouAreHere() {
    requestLocation();
    if (youAreHere) {
      setMapTarget({ center: youAreHere, zoom: YOU_ARE_HERE_ZOOM });
      return;
    }
    flyHereWhenReady.current = true;
  }

  function selectSighting(id: string) {
    const next = SIGHTINGS.find((s) => s.id === id);
    if (!next) return;
    setSelectedId(id);
    if (next.cluster === "nashville-south") {
      setView("tennessee");
      setMapTarget({ center: [next.lat, next.lng], zoom: 11 });
    } else if (next.cluster === "columbus-ga") {
      setView("columbus-ga");
      setMapTarget({ center: [next.lat, next.lng], zoom: 11 });
    } else if (next.cluster === "florida-run") {
      setView("florida-run");
      setMapTarget({ center: [next.lat, next.lng], zoom: 9 });
    } else {
      setView("us");
      setMapTarget({ center: [next.lat, next.lng], zoom: 6 });
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="scanlines" aria-hidden="true" />
      <header className="relative z-10 border-b border-[#c41e3a]/35 bg-[#0b0708]/90">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div className="flex items-end gap-4">
            <div className="relative hidden h-20 w-16 overflow-hidden border border-[#c41e3a]/50 sm:block">
              <Image src={PORTRAIT_SRC} alt="File portrait of the Visitor in the tall hat" fill className="object-cover object-top" sizes="64px" />
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.45em] text-[#c41e3a]">UNAUTHORIZED ARCHIVE · DO NOT PET</p>
              <h1 className="font-display text-4xl leading-none text-[#f3e6c8] sm:text-5xl">
                The Cat. The Hat.
              </h1>
              <p className="mt-1 max-w-xl font-serif text-sm text-[#e8d5b5]/80">
                A tall-hat visitor is on the road from Tennessee to Inlet Beach. He detoured through Columbus for trampolines. The blue dot is you. The dashed line is him. Do not pick him up, even if he is very polite about the hurricane.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/70">
            <span className="border border-[#e8d5b5]/20 px-2 py-1">{SIGHTINGS.length} SIGHTINGS</span>
            <span className="border border-[#c41e3a]/40 px-2 py-1 text-[#c41e3a]">{COLUMBUS_GA_CLUSTER.length} COLUMBUS · TRAMPOLINES</span>
            <span className="border border-[#e8d5b5]/20 px-2 py-1">{FLORIDA_RUN.length} ON THE FLORIDA RUN</span>
            <span className="blink border border-[#e8d5b5]/20 px-2 py-1">STATUS: HEADING TO 30A</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid max-w-7xl gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_22rem] sm:px-6">
        <section className="flex min-h-[70vh] min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#e8d5b5]/55">
              NASHVILLE → COLUMBUS → INLET BEACH · PINS ARE CONFIRMED FILES
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setView("tennessee");
                  setSelectedId("franklin");
                  setMapTarget({ center: TENNESSEE_CENTER, zoom: TENNESSEE_ZOOM });
                }}
                className={`font-mono text-[10px] tracking-[0.2em] border px-3 py-1.5 ${
                  view === "tennessee"
                    ? "border-[#c41e3a] bg-[#c41e3a]/20 text-[#f3e6c8]"
                    : "border-[#e8d5b5]/25 text-[#e8d5b5]/70 hover:border-[#c41e3a]/60"
                }`}
              >
                TENNESSEE
              </button>
              <button
                type="button"
                onClick={() => {
                  setView("columbus-ga");
                  setSelectedId("columbus-ga-trampoline");
                  setMapTarget({ center: COLUMBUS_GA_CENTER, zoom: COLUMBUS_GA_ZOOM });
                }}
                className={`font-mono text-[10px] tracking-[0.2em] border px-3 py-1.5 ${
                  view === "columbus-ga"
                    ? "border-[#c41e3a] bg-[#c41e3a]/20 text-[#f3e6c8]"
                    : "border-[#e8d5b5]/25 text-[#e8d5b5]/70 hover:border-[#c41e3a]/60"
                }`}
              >
                COLUMBUS GA
              </button>
              <button
                type="button"
                onClick={() => {
                  setView("florida-run");
                  setSelectedId("inlet-beach");
                  setMapTarget({ center: FLORIDA_RUN_CENTER, zoom: FLORIDA_RUN_ZOOM });
                }}
                className={`font-mono text-[10px] tracking-[0.2em] border px-3 py-1.5 ${
                  view === "florida-run"
                    ? "border-[#c41e3a] bg-[#c41e3a]/20 text-[#f3e6c8]"
                    : "border-[#e8d5b5]/25 text-[#e8d5b5]/70 hover:border-[#c41e3a]/60"
                }`}
              >
                FLORIDA RUN
              </button>
              <button
                type="button"
                onClick={goToYouAreHere}
                className="border border-[#3b82f6]/70 px-3 py-1.5 font-mono text-[10px] tracking-[0.2em] text-[#9ec0ff] hover:bg-[#3b82f6]/15"
              >
                YOU ARE HERE
              </button>
              <button
                type="button"
                onClick={() => {
                  setView("us");
                  setMapTarget({ center: US_CENTER, zoom: US_ZOOM });
                }}
                className={`font-mono text-[10px] tracking-[0.2em] border px-3 py-1.5 ${
                  view === "us"
                    ? "border-[#c41e3a] bg-[#c41e3a]/20 text-[#f3e6c8]"
                    : "border-[#e8d5b5]/25 text-[#e8d5b5]/70 hover:border-[#c41e3a]/60"
                }`}
              >
                WHOLE COUNTRY
              </button>
            </div>
          </div>
          <div id="map-region" className="relative min-h-[52vh] flex-1 overflow-hidden border border-[#c41e3a]/30 shadow-[0_0_40px_rgba(196,30,58,0.12)]">
            <SightingsMap
              selectedId={selected.id}
              center={mapTarget.center}
              zoom={mapTarget.zoom}
              youAreHere={youAreHere}
              onSelect={selectSighting}
            />
            <p className="pointer-events-none absolute bottom-3 left-3 z-[400] flex items-center gap-2 border border-[#3b82f6]/50 bg-[#0b0708]/80 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-[#9ec0ff]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]" aria-hidden="true" />
              {hereLabel(hereStatus)}
            </p>
            {view === "tennessee" ? (
              <p className="pointer-events-none absolute top-3 right-3 z-[400] border border-[#c41e3a]/50 bg-[#0b0708]/80 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-[#f3e6c8]">
                SOUTH OF NASHVILLE
              </p>
            ) : null}
            {view === "columbus-ga" ? (
              <p className="pointer-events-none absolute top-3 right-3 z-[400] border border-[#c41e3a]/50 bg-[#0b0708]/80 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-[#f3e6c8]">
                HE LIKES TRAMPOLINES
              </p>
            ) : null}
            {view === "florida-run" ? (
              <p className="pointer-events-none absolute top-3 right-3 z-[400] border border-[#c41e3a]/50 bg-[#0b0708]/80 px-2 py-1 font-mono text-[10px] tracking-[0.25em] text-[#f3e6c8]">
                THE DRIVE TO 30A
              </p>
            ) : null}
          </div>
          <ul className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1">
            {SIGHTINGS.map((sighting) => (
              <li key={sighting.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => selectSighting(sighting.id)}
                  className={`whitespace-nowrap border px-3 py-2 text-left ${
                    sighting.id === selected.id
                      ? "border-[#c41e3a] bg-[#c41e3a]/15"
                      : "border-[#e8d5b5]/15 hover:border-[#c41e3a]/50"
                  }`}
                >
                  <span className="block font-mono text-[9px] tracking-[0.18em] text-[#c41e3a]">
                    {clusterChip(sighting)} · {KIND_LABEL[sighting.kind]}
                  </span>
                  <span className="block font-serif text-sm text-[#f3e6c8]">{sighting.city}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="border border-[#e8d5b5]/15 bg-[#12090b]/80">
          <div className="relative aspect-[4/3] border-b border-[#c41e3a]/30">
            <Image
              src={selected.image}
              alt={selected.imageCaption}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 22rem"
              priority
            />
            <p className="absolute right-2 bottom-2 border border-black/40 bg-[#0b0708]/80 px-2 py-1 font-mono text-[9px] tracking-[0.2em] text-[#f3e6c8]">
              {selected.fileNumber}
            </p>
          </div>
          <div className="space-y-3 p-4">
            <p className="font-mono text-[10px] tracking-[0.3em] text-[#c41e3a]">
              {KIND_LABEL[selected.kind]} · {selected.date} · {selected.time}
            </p>
            <h2 className="font-display text-3xl leading-none text-[#f3e6c8]">{selected.city}, {selected.state}</h2>
            <p className="font-serif text-sm text-[#e8d5b5]/80">{selected.place}</p>
            <p className="font-serif text-base text-[#f3e6c8]">{selected.summary}</p>
            <p className="font-serif text-sm leading-relaxed text-[#e8d5b5]/75">{selected.details}</p>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#e8d5b5]/45">WITNESS: {selected.witness}</p>
            <ul className="space-y-1 border-t border-[#e8d5b5]/10 pt-3">
              {selected.oddities.map((item) => (
                <li key={item} className="flex gap-2 font-serif text-sm text-[#e8d5b5]/80">
                  <span className="text-[#c41e3a]" aria-hidden="true">
                    ▣
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#e8d5b5]/35">{selected.imageCaption}</p>
          </div>
        </aside>
      </main>

      <footer className="relative z-10 border-t border-[#e8d5b5]/10 px-4 py-6 text-center sm:px-6">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#e8d5b5]/40">
          FICTIONAL SIGHTING ARCHIVE · THE VISITOR IS NOT REAL · PROBABLY
        </p>
        <p className="mt-2 font-serif text-xs text-[#e8d5b5]/45">
          Original tall-hat cat. Campfire story only. If you see a polite cat in a hat on I-65 holding a hurricane sign, do not give him a ride.
        </p>
      </footer>
    </div>
  );
}
