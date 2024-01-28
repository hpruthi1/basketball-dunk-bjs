import InputManager from "../managers/InputManager";
import { Ball } from "../utils/Ball";
import { IInputReceiver } from "../interfaces/IInputReceiver";
import { Scene } from "@babylonjs/core";
import SfxSystem, { SoundEnum } from "../systems/sound-effects-system";

class Player implements IInputReceiver {
  public ball: Ball;

  private _inputManager: InputManager;
  private _scene: Scene;

  public throwForce = 30;
  public canShoot = true;

  constructor(inputManager: InputManager, ball: Ball, scene: Scene) {
    this.ball = ball;
    this._inputManager = inputManager;
    this._scene = scene;
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
        this.respawn();
        this.canShoot = true;
      }, 2000);
    }
  }

  inputReceiverInit(): void {
    console.log("Display UI");
  }
}

export default Player;
