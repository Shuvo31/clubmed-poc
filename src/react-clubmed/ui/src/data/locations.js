import { useState, useEffect } from "react";

export const CLUBMED_LOCATIONS_DUMMY = [];

function mapPythonDataToReact(pythonData) {
  return pythonData.map((v, idx) => ({
    id: v.id || idx,
    lat: v.lat,
    lng: v.lng,
    title: v.n || "",
    titleSuffix: v.co || "",
    tag:
      v.ss && v.ss.length > 0
        ? v.ss.includes("WINTER")
          ? "Winter"
          : "Summer"
        : "",
    location:
      v.ar && v.co
        ? v.ar + " · " + v.co
        : v.co || v.ar || "",
    oldPrice: v.ip ? "€" + v.ip : null,
    newPrice: v.bp
      ? "€" + v.bp
      : v.ip
        ? "€" + v.ip
        : "",
    img: v.img || "",
    desc: v.dt || "",
    reasonTitle: v.dt || "",
    reasonDesc: v.ad || "",
    accommodationDesc: v.ad || "",
    activitiesDesc: v.ad || "",
    images: v.si && v.si.length > 0 ? v.si : [],
    exclusive: v.ec || false,
    ratingText: v.cl ? v.cl + "/5" : null,
  }));
}

export const CLUBMED_LOCATIONS =
  typeof window !== "undefined" && window.__CLUBMED_DATA__
    ? mapPythonDataToReact(window.__CLUBMED_DATA__)
    : CLUBMED_LOCATIONS_DUMMY;

export function useClubMedData() {
  const [locations, setLocations] = useState(() => {
    if (
      typeof window !== "undefined" &&
      window.__CLUBMED_DATA__
    ) {
      return mapPythonDataToReact(window.__CLUBMED_DATA__);
    }
    return null;
  });
  const [loading, setLoading] = useState(!locations);

  useEffect(() => {
    if (!locations) {
      setLoading(true);
      fetch("http://localhost:8001/api/clubmed-data")
        .then((res) => {
          if (!res.ok)
            throw new Error(
              "Local Dev API failed to answer. Did you run local_dev_api.py?"
            );
          return res.json();
        })
        .then((pythonData) => {
          console.log(
            "Successfully fetched actual local Club Med Data",
            pythonData
          );
          setLocations(mapPythonDataToReact(pythonData));
          setLoading(false);
        })
        .catch((err) => {
          console.error(
            "Falling back to dummy data due to error: ",
            err.message
          );
          setLocations(CLUBMED_LOCATIONS_DUMMY);
          setLoading(false);
        });
    }
  }, [locations]);

  return { locations, loading };
}
