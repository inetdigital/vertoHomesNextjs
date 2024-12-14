"use client";

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Greyscale map style
const mapStyles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#e1e6ea",
      },
    ],
  },
  {
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text",
    stylers: [
      {
        color: "#f40606",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#1f1b37",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
];

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
};

const MapWithMarker = ({ geoLocation, companyLogo }) => {
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  // Extract latitude and longitude from Prismic Geolocation field
  const { latitude, longitude } = geoLocation;

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const handleApiLoad = () => {
    setIsApiLoaded(true);
  };

  return (
    <div className="">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        onLoad={handleApiLoad}
      >
        {isApiLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
            options={{ styles: mapStyles }}
          >
            <Marker
              position={center}
              icon={{
                url: companyLogo,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};

export default MapWithMarker;
