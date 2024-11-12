import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapData from "../data/counties.json"; // Adjust path if needed

const CountyMap = () => {
  const [color, setColor] = useState("#ffff00");

  // Style for each county
  const countyStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  // Event handler for changing the county color
  const changeCountyColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: color,
      fillOpacity: 1,
    });
  };

  // Set up interactivity on each county
  const onEachCounty = (county, layer) => {
    console.log(county.properties)
    const countyName = county.properties.NAMELSAD;
    layer.bindPopup(countyName);
    layer.options.fillOpacity = Math.random();

    layer.on({
      click: changeCountyColor,
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Map</h1>
      <MapContainer center={[37.8, -96]} zoom={4} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          style={countyStyle}
          data={mapData.features}
          onEachFeature={onEachCounty}
        />
      </MapContainer>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
};

export default CountyMap;
