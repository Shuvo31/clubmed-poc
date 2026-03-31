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
  const [data, setData] = useState(() => {
    if (typeof window !== "undefined" && window.__CLUBMED_DATA__) {
      return {
        view: window.__CLUBMED_DATA__.view,
        resort: window.__CLUBMED_DATA__.resort
          ? mapPythonDataToReact([window.__CLUBMED_DATA__.resort])[0]
          : null,
        allVillages: mapPythonDataToReact(window.__CLUBMED_DATA__.allVillages || []),
      };
    }
    return null;
  });

  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    if (data) return;

    setLoading(true);

    const queryParams = new URLSearchParams(window.location.search);
    const resortId = queryParams.get('resort_id');

    const apiUrl = resortId
      ? `http://localhost:8001/api/clubmed-data?resort_id=${resortId}`
      : "http://localhost:8001/api/clubmed-data";

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok)
          throw new Error(
            "Local Dev API failed to answer. Did you run local_dev_api.py?"
          );
        return res.json();
      })
      .then((apiData) => {
        console.log("Fetched local dev data:", apiData);
        setData({
          view: apiData.view,
          resort: apiData.resort ? mapPythonDataToReact([apiData.resort])[0] : null,
          allVillages: mapPythonDataToReact(apiData.allVillages || []),
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fallback to dummy data due to error:", err.message);
        setData({
          view: "map",
          resort: null,
          allVillages: CLUBMED_LOCATIONS_DUMMY,
        });
        setLoading(false);
      });
  }, [data]);

  return { data, loading };
}
