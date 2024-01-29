import { useContext } from "react";
import { experienceContext } from "../context/Context";

const Score = () => {
  const { score } = useContext(experienceContext);

  return <div className="center_container">Score: {score}</div>;
};

export default Score;
