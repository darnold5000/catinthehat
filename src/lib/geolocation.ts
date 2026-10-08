"use client";

import { useCallback, useEffect, useState } from "react";

export type LocationStatus = "locating" | "live" | "denied" | "unavailable";

const GPS_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 10_000,
  timeout: 20_000,
};

export function useLiveLocation() {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [status, setStatus] = useState<LocationStatus>("locating");

  const applyPosition = useCallback((position: GeolocationPosition) => {
    setCoords([position.coords.latitude, position.coords.longitude]);
    setStatus("live");
  }, []);

  const applyError = useCallback((error: GeolocationPositionError) => {
    setStatus(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable");
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(applyPosition, applyError, GPS_OPTIONS);
    return () => navigator.geolocation.clearWatch(watchId);
  }, [applyError, applyPosition]);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("unavailable");
      return;
    }
    setStatus((current) => (current === "live" ? current : "locating"));
    navigator.geolocation.getCurrentPosition(applyPosition, applyError, GPS_OPTIONS);
  }, [applyError, applyPosition]);

  return { coords, status, requestLocation };
}
