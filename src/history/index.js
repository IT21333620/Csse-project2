import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import apiDefinitions from "../api/apiDefinitions";

const History = () => {
  const [apod, setApod] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const formatedDate = selectedDate.format("YYYY-MM-DD");
    apiDefinitions
      .filterAPOD(formatedDate)
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
  }, [selectedDate]);

  useEffect(() => {
    console.log(apod);
  }, [apod]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3" component="h1">
          View Earlier APOD
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              maxDate={dayjs()}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h3">
          {apod.title}
        </Typography>
      </Grid>
      {apod.media_type === "video" ? (
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
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
    </Grid>
  );
};

export default History;
