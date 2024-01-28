import InputManager from "../managers/InputManager";
import { Ball } from "../utils/Ball";
import { IInputReceiver } from "../interfaces/IInputReceiver";
import { Scene, UniversalCamera, Vector3 } from "@babylonjs/core";

class Player implements IInputReceiver {
  public ball: Ball;

  private _inputManager: InputManager;
  private _scene: Scene;
  private playerCamera: UniversalCamera;

  public throwForce = 30;
  public canShoot = true;

  constructor(inputManager: InputManager, ball: Ball, scene: Scene) {
    this.ball = ball;
    this._inputManager = inputManager;
    this._scene = scene;
    this.playerCamera = this._scene.activeCamera as UniversalCamera;
    this._inputManager.setInputReceiver(this);
  }

  public respawn() {
    this.ball = new Ball(this._scene);
  }

  handleKeyboardEvent(code: string, pressed: boolean): void {
    if (code === "Space" && pressed && this.canShoot) {
      this.ball.aggregate?.body.applyImpulse(
        this.playerCamera
          .getDirection(Vector3.Forward())
          .normalize()
          .scale(this.throwForce),
        this.ball.geometry!.getAbsolutePosition()
      );
      this.canShoot = false;

      setTimeout(() => {
        this.respawn();
        this.canShoot = true;
      }, 1500);
    }
  }

  inputReceiverInit(): void {
    console.log("Display UI");
  }
}

export default Player;
