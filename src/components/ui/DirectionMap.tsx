import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DirectionMap = ({ start, end }) => {
  useEffect(() => {
    const map = L.map("map").setView([start[1], start[0]], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Call OpenRouteService directions API
    const fetchRoute = async () => {
      const res = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          method: "POST",
          headers: {
            Authorization:
              "5b3ce3597851110001cf62488d8bf5fbf5134087a250246d98fe102c",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coordinates: [start, end],
          }),
        }
      );

      const data = await res.json();

      const geojson = L.geoJSON(data, {
        style: { color: "blue", weight: 4 },
      }).addTo(map);

      map.fitBounds(geojson.getBounds());
    };

    fetchRoute();

    // Cleanup
    return () => map.remove();
  }, [start, end]);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default DirectionMap;
