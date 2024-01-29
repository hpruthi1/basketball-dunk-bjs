import { useContext } from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { IconButton } from "@mui/material";
import { experienceContext } from "../../context/Context";

const Shooter = () => {
  const { getGameManager, buttonVisible, setbuttonVisible } =
    useContext(experienceContext);

  const manager = getGameManager()!;
  return (
    <div className="shoot_button">
      {buttonVisible ? (
        <IconButton
          onClick={() => {
            setbuttonVisible(false);
            manager.player.handleShoot();
          }}
        >
          <RocketLaunchIcon htmlColor="white" />
        </IconButton>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Shooter;
