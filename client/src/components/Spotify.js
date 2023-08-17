import React, { useState, useEffect } from "react";
import spotifyWebApi from "spotify-web-api-js";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Switch from "@mui/material/Switch";

import { useDispatch } from "react-redux";
import { increment } from "../counterSlice";

const spotifyApi = new spotifyWebApi();

function Spotify() {
  const [artists, setArtists] = useState([]);

  const dispatch = useDispatch();

  const getArtist = () => {
    var arr = [];
    spotifyApi.getMyTopArtists().then((response) => {
      console.log(response.items);
      setArtists(response.items);
      artists.map((artist) => arr.push(artist.name));
    });
    setArtists(arr);
  };

  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    dispatch(increment());

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    console.log("session storage brfore set: ", newChecked);
    sessionStorage.setItem("myArray", JSON.stringify(newChecked));
  };

  return (
    <>
      <div style={{ position: "absolute", top: 200, left: 370 }}>
        <h1 style={{ color: "white" }}> Top Artists: </h1>
      </div>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          "& ul": { padding: 0 },
        }}
      >
        {" "}
        {artists.map((artist) => (
          <ListItem key={artist.id}>
            <ListItemText
              id={artist.id}
              primary={artist.name}
              sx={{ color: "white" }}
            />
            <Switch
              edge="end"
              onChange={handleToggle(artist.name)}
              checked={checked.indexOf(artist.name) !== -1}
              inputProps={{
                "aria-labelledby": artist.id,
              }}
            />
          </ListItem>
        ))}
      </List>
      <Button color="success" variant="contained" onClick={() => getArtist()}>
        Check Top Artist
      </Button>
    </>
  );
}

export default Spotify;
