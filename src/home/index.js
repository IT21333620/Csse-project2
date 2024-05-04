import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import apiDefinitions from "../api/apiDefinitions";
const Home = () => {
  const [apod, setApod] = useState([]);

  useEffect(() => {
    apiDefinitions
      .getAPOD()
      .then((response) => {
        if (response.status === 200) {
          setApod(response.data);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(apod);
  }, [apod]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" component="h1">
          Astornomy Picture of the Day
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h3">
          {apod.title}
        </Typography>
      </Grid>
      {apod.media_type === "video" ? (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
        <div style={{ position: "relative", width: "90%", paddingTop: "56.25%" }}>
          {/* 16:9 aspect ratio */}
          <ReactPlayer
            url={apod.url}
            style={{ position: "absolute", top: 0, left: 0 }}
            width="100%"
            height="100%"
          />
        </div>
      </Grid>
      ) : null}
      {apod.media_type === "image" ? (
        <>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "800px",
              maxHeight: "600px",
            }}
          >
            <img
              src={apod.url}
              alt={apod.title}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            {apod.media_type === "image" && (
              <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
                <Button variant="contained" color="primary">
                  Open HD Image
                </Button>
              </a>
            )}
          </Grid>
        </>
      ) : null}

      <Grid item xs={12}>
        <Typography variant="body1" component="p">
          {apod.explanation}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
