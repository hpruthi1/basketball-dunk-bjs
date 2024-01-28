import { Engine, Sound } from "@babylonjs/core";

export enum SoundEnum {
  SHOOT = 0,
}

const soundsAndURLs = [[SoundEnum.SHOOT.toString(), "/Sounds/shoot.wav"]];

class SfxSystem {
  public sounds: Map<string, Sound>;

  public static instance: SfxSystem;

  constructor() {
    this.sounds = new Map<string, Sound>();

    const audioEngine = Engine.audioEngine!;
    audioEngine.useCustomUnlockedButton = true;

    window.addEventListener(
      "click",
      () => {
        if (!Engine.audioEngine?.unlocked) {
          Engine.audioEngine?.unlock();
        }
      },
      { once: true }
    );
  }

  public static getSfxSystem(): SfxSystem {
    if (!this.instance) this.instance = new SfxSystem();
    return this.instance;
  }

  async loadSounds() {
    await Promise.all(
      soundsAndURLs.map(([sound, url]) => {
        if (url !== "") {
          const loadedSound = new Sound(sound, url);
          this.sounds.set(sound, loadedSound);
        }
      })
    );
  }
}

export default SfxSystem;
