import { Dispatch, SetStateAction, createContext } from "react";
import GameManager from "../pages/Experience/Scene/managers/GameManager";

export interface IExperienceContextType {
  isLoading: boolean;
  musicPlaying: boolean;
  score: number;
  toggleAmbientSound: () => void;
  setisLoading: Dispatch<SetStateAction<boolean>>;
  setmusicPlaying: Dispatch<SetStateAction<boolean>>;
  setscore: Dispatch<SetStateAction<number>>;
  getGameManager: () => GameManager | undefined;
}

export const experienceContext = createContext<IExperienceContextType>(
  {} as IExperienceContextType
);
