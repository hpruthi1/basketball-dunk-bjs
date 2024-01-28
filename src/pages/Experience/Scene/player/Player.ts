import InputManager from "../managers/InputManager";
import { Ball } from "../utils/Ball";
import { IInputReceiver } from "../interfaces/IInputReceiver";
import { Scene } from "@babylonjs/core";
import SfxSystem, { SoundEnum } from "../systems/sound-effects-system";
import { Viewer } from "../Viewer";

class Player implements IInputReceiver {
  public ball: Ball;

  private _inputManager: InputManager;
  private _scene: Scene;

  public throwForce = 30;
  public canShoot = true;

  private _viewer: Viewer | undefined;

  constructor(viewer: Viewer) {
    this._viewer = viewer;
    this.ball = viewer.ball!;
    this._inputManager = viewer.inputManager!;
    this._scene = viewer.scene!;
    this._inputManager.setInputReceiver(this);
  }

  public respawn() {
    this.ball = new Ball(this._scene);
  }

  handleKeyboardEvent(code: string, pressed: boolean): void {
    if (code === "Space" && pressed && this.canShoot) {
      const sfxSystem = SfxSystem.getSfxSystem();
      sfxSystem.sounds.get(SoundEnum.SHOOT.toString())?.play();
      this.ball.shoot();
      this.canShoot = false;

      setTimeout(() => {
        const data = this.ball.geometry?.metadata;

        if (data?.passthroughSensor1 && data?.passthroughSensor2) {
          this._viewer!.gameManager!.score += 20;
          this._viewer?.props.experienceContextProp.setscore(
            this._viewer!.gameManager!.score
          );
        }
        this.respawn();
        this.canShoot = true;
      }, 5000);
    }
  }

  inputReceiverInit(): void {
    console.log("Display UI");
  }
}

export default Player;
