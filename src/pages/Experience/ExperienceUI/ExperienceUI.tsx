import "./ExperienceUI.css";
import VolumeComponent from "../../../components/volume-control/VolumeComponent";
import Score from "../../../components/Score";
import Shooter from "../../../components/shooter/Shooter";

const ExperienceUI = () => {
  return (
    <div className="experience_ui_root">
      <Score />
      <VolumeComponent />
      <Shooter />
    </div>
  );
};

export default ExperienceUI;
