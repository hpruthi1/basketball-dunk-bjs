import { useRef, useState } from "react";
import ExperienceUI from "./ExperienceUI/ExperienceUI";
import { experienceContext } from "../../context/Context";
import ViewerFC, { Viewer } from "./Scene/Viewer";

const Experience = () => {
  const viewerRef = useRef<Viewer>(null);
  const [isLoading, setisLoading] = useState(true);
  const [musicPlaying, setmusicPlaying] = useState(true);
  const [buttonVisible, setbuttonVisible] = useState(true);
  const [score, setscore] = useState(0);

  const toggleAmbientSound = () => {
    viewerRef?.current?.toggleAmbientSound();
  };

  const getGameManager = () => {
    return viewerRef?.current?.gameManager;
  };

  return (
    <experienceContext.Provider
      value={{
        isLoading: isLoading,
        musicPlaying: musicPlaying,
        setmusicPlaying: setmusicPlaying,
        setisLoading: setisLoading,
        toggleAmbientSound: toggleAmbientSound,
        score: score,
        setscore: setscore,
        getGameManager: getGameManager,
        buttonVisible: buttonVisible,
        setbuttonVisible: setbuttonVisible,
      }}
    >
      <ExperienceUI />
      <ViewerFC viewerRef={viewerRef} />
    </experienceContext.Provider>
  );
};

export default Experience;
