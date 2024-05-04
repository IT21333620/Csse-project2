import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CircularProgress from "@mui/material/CircularProgress";

//Image imports
import apiDefinitions from "../api/apiDefinitions";
import imgCuriosity from "../public/images/curiosity.jpg";
import imgOpportunity from "../public/images/opportunity.jpg";
import imgSpirit from "../public/images/spirit.jpg";

const StyledCard = styled(Card)(({ isSelected }) => ({
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(0.95)",
  },
  backgroundColor: isSelected ? "#E5E4E2" : "white", // Change background color when selected
}));

const steps = ["Select Rover", "Select Sol", "Select a Camera"];

const MarsRover = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [selectedCard, setSelectedCard] = useState(null);
  const [sol, setSol] = useState(0);
  const [maxSol, setMaxSol] = useState(0);
  const [data, setData] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [cameraList, setCameraList] = useState([]);
  const [marsImages, setMarsImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const handleImageLoad = (id) => {
    const newLoadedImages = new Set(loadedImages);
    newLoadedImages.add(id);
    setLoadedImages(newLoadedImages);

    if (newLoadedImages.size === marsImages.length) {
      setAllImagesLoaded(true);
    }
  };

  const handleCardClick = (index) => {
    if (selectedCard === index) {
      setSelectedCard(null); // Deselect the card if it's already selected
    } else {
      setSelectedCard(index); // Otherwise, select the card
      setActiveStep(1);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    // Ensure that the value is within the allowed range
    const newValue = Math.min(Math.max(parseInt(value), 0), maxSol);
    setSol(newValue);
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (activeStep === 2) {
      setSelectedCamera("empty");
    }
  }, [activeStep]);

  useEffect(() => {
    console.log(selectedCard);
    if (activeStep === 1 && sol == 0) {
      setIsLoading(true);
      apiDefinitions.roverManifest(selectedCard).then((response) => {
        if (response && response.status === 200) {
          console.log(response.data);
          setMaxSol(response.data.photo_manifest.max_sol);
          setData(response.data);
          setIsLoading(false);
        } else {
          console.log("Error");
          setIsLoading(false);
        }
      });
    }
  }, [selectedCard, activeStep]);

  useEffect(() => {
    if (data && data.photo_manifest.photos && activeStep === 2) {
      console.log(data);
      console.log(sol);
      const filteredPhotos = data.photo_manifest.photos.filter(
        (photo) => photo.sol === sol
      );
      setPhotos(filteredPhotos);
      console.log(filteredPhotos);

      if (filteredPhotos.length === 0) {
        setSelectedCamera("");
        setActiveStep(1);
        toast.error("No photos available for selected SOL");
      } else {
        setCameraList(filteredPhotos[0].cameras);
        console.log(filteredPhotos[0].cameras);
      }
    }
  }, [sol, activeStep]);

  useEffect(() => {
    if (selectedCamera && activeStep === 3) {
      setIsLoading(true);
      apiDefinitions
        .getRoverPhotos(selectedCard, sol, selectedCamera)
        .then((response) => {
          setIsLoading(false);
          if (response.status === 200) {
            console.log(response.data);
            setMarsImages(response.data.photos);
          }
        });
    }
  }, [selectedCamera, activeStep]);

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setSelectedCamera("");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedCamera("");
    setSelectedCard(null);
    setSol(0);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h3" component="h1">
              Mars Rover Photos
            </Typography>
          </Grid>
        </Grid>
        <Stepper activeStep={activeStep} sx={{ mt: 5 }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === 0 ? (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid
              container
              item
              xs={12}
              md={10}
              lg={12}
              spacing={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                {" "}
                {/* Each card will occupy 12 columns on extra small screens, 6 columns on small screens, 4 columns on medium screens, and 3 columns on large screens */}
                <StyledCard
                  isSelected={selectedCard === "curiosity"}
                  onClick={() => handleCardClick("curiosity")}
                  sx={{ width: "100%" }}
                >
                  <CardHeader title="Curiosity" />
                  <CardMedia
                    component="img"
                    height="194"
                    image={imgCuriosity}
                    alt="Curiosity"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Curiosity Rover
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StyledCard
                  isSelected={selectedCard === "opportunity"}
                  onClick={() => handleCardClick("opportunity")}
                  sx={{ width: "100%" }}
                >
                  <CardHeader title="Opportunity" />
                  <CardMedia
                    component="img"
                    height="194"
                    image={imgOpportunity}
                    alt="Opportunity"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Opportunity Rover
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StyledCard
                  isSelected={selectedCard === "spirit"}
                  onClick={() => handleCardClick("spirit")}
                  sx={{ width: "100%" }}
                >
                  <CardHeader title="Spirit" />
                  <CardMedia
                    component="img"
                    height="194"
                    image={imgSpirit}
                    alt="Spirit"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Spirit Rover
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Grid>
        ) : activeStep === 1 ? (
          isLoading ? (
            <Grid container sx={{ mt: 3 }}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CircularProgress />
                <Typography>Loading</Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="h5" component="h2">
                  Select SOL
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="body1" component="h2">
                  Sol is a solar day on Mars; that is, a Mars-day. A sol is the
                  apparent interval between two successive returns of the Sun to
                  the same meridian (sundial time) as seen by an observer on
                  Mars. A sol is slightly longer than an Earth day. It is
                  approximately 24 hours, 39 minutes, 35 seconds long. A Martian
                  year is approximately 668.6 sols, equivalent to approximately
                  687 Earth days or 1.88 Earth years.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="body1" component="h2">
                  Max Sol for the {selectedCard} rover is {maxSol}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  type="number"
                  defaultValue={50}
                  value={sol}
                  onChange={handleChange}
                  inputProps={{
                    max: maxSol,
                  }}
                />
              </Grid>
            </Grid>
          )
        ) : activeStep === 2 ? (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid
              item
              xs={12}
              sm={6} // Each item will occupy 12 columns on extra small screens and 6 columns on small screens
              md={3} // Each item will occupy 3 columns on medium screens and above
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="body1" component="h2">
                Sol: {sol}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="body1" component="h2">
                Earth Date: {photos[0]?.earth_date}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography variant="body1" component="h2">
                Total Photos: {photos[0]?.total_photos}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Camera</InputLabel>
                  <Select
                    defaultValue=""
                    labelId="camera-select-label"
                    id="camera-select"
                    value={selectedCamera}
                    label="Select Camera"
                    onChange={handleCameraChange}
                  >
                    <MenuItem value="" disabled>
                      Select Camera
                    </MenuItem>
                    {cameraList.map((camera, index) => (
                      <MenuItem key={camera} value={camera}>
                        {camera}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        ) : null}
        {activeStep === steps.length ? (
          isLoading ? (
            <Grid container sx={{ mt: 3 }}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CircularProgress />
                <Typography>Loading</Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Fragment>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  {allImagesLoaded && (
                    <p>Images failed to load (Cause: 307 Internal Redirect)</p>
                  )}
                  <ImageList cols={3}>
                    {marsImages.map((item) => (
                      <ImageListItem key={item.id}>
                        {!loadedImages.has(item.id) && (
                          <img
                            srcSet={`${item.img_src.replace(
                              /^http:\/\//i,
                              "https://"
                            )}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img_src.replace(
                              /^http:\/\//i,
                              "https://"
                            )}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.earth_date}
                            loading="lazy"
                            onError={() => handleImageLoad(item.id)}
                          />
                        )}
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              </Fragment>
            </Grid>
          )
        ) : activeStep === 1 || activeStep === 2 ? (
          <Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} disabled={selectedCamera == "empty"}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </Fragment>
        ) : null}
      </Box>
    </>
  );
};

export default MarsRover;
