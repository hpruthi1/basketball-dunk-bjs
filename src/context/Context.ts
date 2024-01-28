import { Dispatch, SetStateAction, createContext } from "react";

export interface IExperienceContextType {
  isLoading: boolean;
  musicPlaying: boolean;
  toggleAmbientSound: () => void;
  setisLoading: Dispatch<SetStateAction<boolean>>;
  setmusicPlaying: Dispatch<SetStateAction<boolean>>;
}

export const experienceContext = createContext<IExperienceContextType>(
  {} as IExperienceContextType
);
