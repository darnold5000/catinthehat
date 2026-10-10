"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DRIVE_PATH, SIGHTINGS, type Sighting } from "@/lib/sightings";

type SightingsMapProps = {
  selectedId: string;
  center: [number, number];
  zoom: number;
  youAreHere: [number, number] | null;
  onSelect: (id: string) => void;
};

function youAreHereMarkerIcon() {
  return L.divIcon({
    className: "you-are-here-pin",
    html: `<span class="you-are-here-pulse" aria-hidden="true"></span><span class="you-are-here-dot"></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function hatIcon(selected: boolean, clustered: boolean, spotlight: boolean) {
  if (spotlight) {
    return L.divIcon({
      className: `hat-pin hat-pin-spotlight${selected ? " is-selected" : ""}`,
      html: `<span class="hat-pin-spotlight-ring" aria-hidden="true"></span><span class="hat-pin-stack hat-pin-stack-lg" aria-hidden="true"><span class="hat-pin-crown"></span><span class="hat-pin-brim"></span><span class="hat-pin-head"></span></span><span class="hat-pin-label">REVERE ST</span>`,
      iconSize: [72, 78],
      iconAnchor: [36, 70],
      popupAnchor: [0, -64],
    });
  }
  return L.divIcon({
    className: `hat-pin${selected ? " is-selected" : ""}${clustered ? " is-cluster" : ""}`,
    html: `<span class="hat-pin-stack" aria-hidden="true"><span class="hat-pin-crown"></span><span class="hat-pin-brim"></span><span class="hat-pin-head"></span></span>`,
    iconSize: [28, 46],
    iconAnchor: [14, 44],
    popupAnchor: [0, -40],
  });
}

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.85 });
  }, [center, zoom, map]);
  return null;
}

export default function SightingsMap({ selectedId, center, zoom, youAreHere, onSelect }: SightingsMapProps) {
  const [ready, setReady] = useState(false);
  const hereIcon = useMemo(() => youAreHereMarkerIcon(), []);
  const icons = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    for (const sighting of SIGHTINGS) {
      map.set(
        sighting.id,
        hatIcon(sighting.id === selectedId, Boolean(sighting.cluster), Boolean(sighting.mapSpotlight)),
      );
    }
    return map;
  }, [selectedId]);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0b0708] text-[11px] tracking-[0.35em] text-[#e8d5b5]/50">
        UNFOLDING THE MAP…
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      minZoom={3}
      maxZoom={12}
      scrollWheelZoom
      className="h-full w-full bg-[#0b0708]"
      worldCopyJump={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo center={center} zoom={zoom} />
      <Polyline
        positions={DRIVE_PATH}
        pathOptions={{ color: "#c41e3a", weight: 2, opacity: 0.5, dashArray: "6 10" }}
      />
      {youAreHere ? (
        <Marker
          position={youAreHere}
          icon={hereIcon}
          zIndexOffset={1000}
          interactive={false}
          title="You are here"
        />
      ) : null}
      <Polyline
        positions={[
          [32.5934, -84.8262],
          [32.5953, -84.8238],
        ]}
        pathOptions={{ color: "#f3e6c8", weight: 3, opacity: 0.55, dashArray: "4 8" }}
      />
      {SIGHTINGS.map((sighting: Sighting) => (
        <Marker
          key={sighting.id}
          position={[sighting.lat, sighting.lng]}
          icon={icons.get(sighting.id)}
          zIndexOffset={sighting.mapSpotlight ? 800 : sighting.id === selectedId ? 400 : 0}
          eventHandlers={{
            click: () => onSelect(sighting.id),
          }}
          title={
            sighting.mapSpotlight
              ? `Revere Street — ${sighting.city}, ${sighting.state}`
              : `${sighting.city}, ${sighting.state}`
          }
        />
      ))}
    </MapContainer>
  );
}
