import React, { useContext } from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { experienceContext } from "../../context/Context";
import { IconButton } from "@mui/material";

const VolumeComponent = () => {
  const { toggleAmbientSound, musicPlaying } = useContext(experienceContext);
  return (
    <div>
      <IconButton
        onClick={() => {
          toggleAmbientSound();
        }}
      >
        {musicPlaying ? (
          <VolumeUpIcon htmlColor="white" />
        ) : (
          <VolumeOffIcon htmlColor="white" />
        )}
      </IconButton>
    </div>
  );
};

export default VolumeComponent;
