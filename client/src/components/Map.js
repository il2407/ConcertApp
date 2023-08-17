import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const Muse = [
  " Tel Aviv , Israel",
  "Aarhus, Denmark",
  " Wiener Neustadt, Austria",
  " The Hague , Netherlands",
  " Cologne, Germany",
  "Hradec Králové, Czech Republic",
  " Lyon, France",
  "Scheessel, Germany",
  " Neuhausen ob Eck, Germany",
  " Huddersfield, England",
  " Glasgow, Scotland",
  "Milton Keynes, England",
];

let Bands = {};
Bands["Muse"] = Muse;

const containerStyle = {
  width: "500px",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map() {
  const count = useSelector((state) => state.counter.value);

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyByzq2PepnQNKOjnE3D2ZklMtgft7fcA8E",
  });

  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    let band = JSON.parse(sessionStorage.getItem("myArray"));

    async function getLocations() {
      console.log("These are the bands toggled: ", band);
      //Need to check if the band exist if it does go over the cities and mark
      for (let i = 0; i < band.length; i++) {
        console.log("Bands[band[i]]", i, Bands[band[i]]);
        if (Bands[band[i]] === "undefined") {
          console.log("asas");
        } else {
          const promises = Bands[band[i]].map(async (city) => {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=AIzaSyByzq2PepnQNKOjnE3D2ZklMtgft7fcA8E`
            );
            const data = await response.json();
            return data.results[0].geometry.location;
          });
          const locations = await Promise.all(promises);
          setLocationData(locations);
        }
      }
    }
    getLocations();
  }, [count]);

  return (
    <>
      {isLoaded && (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={4}
            center={locationData[0] || { lat: 37.7749, lng: -122.4194 }}
          >
            {locationData.map((location, index) => (
              <Marker key={index} position={location} />
            ))}
          </GoogleMap>
        </>
      )}
    </>
  );
}

export default Map;
