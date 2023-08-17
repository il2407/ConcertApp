import "./Home.css";
import React from "react";
import Spotify from "../components/Spotify";
import Map from "../components/Map";
import spotifyWebApi from "spotify-web-api-js";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { TypeAnimation } from "react-type-animation";
import { Box, color } from "@mui/system";

const spotifyApi = new spotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

function Home() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      spotifyApi.getMe().then((user) => {
        console.log(user);
      });
      setLoggedIn(true);
    }
  });

  const handleLogOut = () => {
    spotifyApi.setAccessToken("");
    setLoggedIn(false);
  };

  return (
    <>
      {!loggedIn && (
        <div style={{ position: "absolute", top: 400, left: 670 }}>
          <TypeAnimation
            sequence={[
              "Welcome", // Types 'One'
              1000, // Waits 1s
              "Please Sign In To Continue", // Deletes 'One' and types 'Two'
              2000, // Waits 2s
              "Enjoy!", // Types 'Three' without deleting 'Two'
              1000,
              () => {
                console.log("Done typing!"); // Place optional callbacks anywhere in the array
              },
            ]}
            wrapper="div"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: "2em", color: "white" }}
          />
        </div>
      )}
      {loggedIn && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Spotify />
          <div
            className="flex-container"
            // style={{
            //   display: "flex",
            //   flexDirection: "row",
            //   justifyContent: "space-around",
            //   alignItems: "center",
            // }}
          >
            {" "}
            <Map />
            <Button
              color="error"
              variant="contained"
              onClick={() => handleLogOut()}
            >
              Log Out
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
