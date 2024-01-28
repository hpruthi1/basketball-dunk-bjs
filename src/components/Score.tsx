import { useContext } from "react";
import { experienceContext } from "../context/Context";

const Score = () => {
  const { score, getGameManager } = useContext(experienceContext);

  const gameManager = getGameManager()!;

  return <div className="center_container">Score: {score}</div>;
};

export default Score;
