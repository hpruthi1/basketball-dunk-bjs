import { useRef, useState } from "react";
import ExperienceUI from "./ExperienceUI/ExperienceUI";
import { experienceContext } from "../../context/Context";
import ViewerFC, { Viewer } from "./Scene/Viewer";

const Experience = () => {
  const viewerRef = useRef<Viewer>(null);
  const [isLoading, setisLoading] = useState(true);
  const [musicPlaying, setmusicPlaying] = useState(true);

  const toggleAmbientSound = () => {
    viewerRef?.current?.toggleAmbientSound();
  };

  return (
    <experienceContext.Provider
      value={{
        isLoading: isLoading,
        musicPlaying: musicPlaying,
        setmusicPlaying: setmusicPlaying,
        setisLoading: setisLoading,
        toggleAmbientSound: toggleAmbientSound,
      }}
    >
      <ExperienceUI />
      <ViewerFC viewerRef={viewerRef} />
    </experienceContext.Provider>
  );
};

export default Experience;
