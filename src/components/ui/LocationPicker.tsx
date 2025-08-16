import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// fix za default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationPickerProps {
  location: string;
  setLocation: (val: string) => void;
  latLng: [number, number];
  setLatLng: (val: [number, number]) => void;
  placeholder: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
  location,
  setLocation,
  latLng,
  setLatLng,
  placeholder,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const reverseGeocode = async (lat: number, lng: number) => {
  const res = await fetch(
    `https://api.openrouteservice.org/geocode/reverse?api_key=5b3ce3597851110001cf62488d8bf5fbf5134087a250246d98fe102c&point.lat=${lat}&point.lon=${lng}`
  );
  const data = await res.json();
  return data.features[0]?.properties.label || "";
};

  const handleInputChange = async (val: string) => {
    setLocation(val);

    if (val.length < 3) {
      setSuggestions([]);
      return;
    }

    // ORS autocomplete
    const res = await fetch(
      `https://api.openrouteservice.org/geocode/autocomplete?api_key=5b3ce3597851110001cf62488d8bf5fbf5134087a250246d98fe102c&text=${encodeURIComponent(
        val
      )}&boundary.country=MK&size=5`
    );
    const data = await res.json();
    setSuggestions(data.features || []);
  };

  const MapClick = () => {
  useMapEvents({
    click: async (e) => {
      setLatLng([e.latlng.lat, e.latlng.lng]);
      const address = await reverseGeocode(e.latlng.lat, e.latlng.lng);
      setLocation(address);
    },
  });
  return null;
};

  return (
    <div className="mb-4">
      <label>{placeholder}</label>
      <input
        value={location}
        onChange={(e) => handleInputChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2"
        placeholder={placeholder}
      />
      {suggestions.length > 0 && (
        <ul className="border rounded-lg mt-1 bg-white max-h-40 overflow-auto">
          {suggestions.map((s) => (
            <li
              key={s.properties.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setLocation(s.properties.label);
                setLatLng([
                  s.geometry.coordinates[1],
                  s.geometry.coordinates[0],
                ]);
                setSuggestions([]);
              }}
            >
              {s.properties.label}
            </li>
          ))}
        </ul>
      )}

      <MapContainer
        center={latLng}
        zoom={13}
        style={{ height: "200px", marginTop: "8px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
  position={latLng}
  draggable
  eventHandlers={{
    dragend: async (e) => {
      const marker = e.target;
      const position = marker.getLatLng();
      setLatLng([position.lat, position.lng]);

      // Reverse geocode za da setira input
      const address = await reverseGeocode(position.lat, position.lng);
      setLocation(address);
    },
  }}
/>
        <MapClick />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
