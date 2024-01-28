import "./ExperienceUI.css";
import VolumeComponent from "../../../components/volume-control/VolumeComponent";
import Score from "../../../components/Score";

const ExperienceUI = () => {
  return (
    <div className="experience_ui_root">
      <Score />
      <VolumeComponent />
    </div>
  );
};

export default ExperienceUI;
