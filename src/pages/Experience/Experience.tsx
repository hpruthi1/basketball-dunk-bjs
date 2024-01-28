import { useRef, useState } from "react";
import ExperienceUI from "./ExperienceUI/ExperienceUI";
import { experienceConext } from "../../context/Context";
import ViewerFC from "./Scene/Viewer";

const Experience = () => {
  const viewerRef = useRef<typeof ViewerFC>(null);

  const [isLoading, setisLoading] = useState(true);

  const [ambientMusic, setambientMusic] = useState(false);
  const [volume, setvolume] = useState(0);

  return (
    <experienceConext.Provider
      value={{
        isLoading: isLoading,
        setisLoading: setisLoading,
        setambientMusic: setambientMusic,
        setvolume: setvolume,
      }}
    >
      <ExperienceUI />
      <ViewerFC viewerRef={viewerRef} />
    </experienceConext.Provider>
  );
};

export default Experience;
