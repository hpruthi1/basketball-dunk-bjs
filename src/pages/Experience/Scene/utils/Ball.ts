import {
  ArcRotateCamera,
  Mesh,
  MeshBuilder,
  PBRMaterial,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  Texture,
  Vector3,
} from "@babylonjs/core";
import InputManager from "../managers/InputManager";
import { IInputReceiver } from "../interfaces/IInputReceiver";

export class Ball implements IInputReceiver {
  private _scene: Scene;
  private _camera: ArcRotateCamera;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;

  constructor(inputManager: InputManager, scene: Scene) {
    this._scene = scene;
    this._camera = this._scene.activeCamera as ArcRotateCamera;
    this.createGeometry();
    this.attachPhysicsComponent();

    inputManager.setInputReceiver(this);
  }

  handleKeyboardEvent(code: string, pressed: boolean): void {
    console.log(code, pressed);
    console.log(this._camera.getDirection(Vector3.Forward()).normalize());
  }

  inputReceiverInit(): void {
    console.log("Display UI");
  }

  createGeometry() {
    this.geometry = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2, segments: 32 },
      this._scene
    );

    this.geometry.rotation = new Vector3(
      Math.PI * 0.5,
      this.geometry.rotation.y,
      Math.PI * 0.25
    );

    this.geometry.scalingDeterminant = 0.5;

    const material = new PBRMaterial("ballMat", this._scene);
    material.unlit = true;

    const ballTexture = new Texture(
      "ball.png",
      this._scene,
      { noMipmap: false },
      true,
      Texture.TRILINEAR_SAMPLINGMODE
    );

    material.albedoTexture = ballTexture;

    this.geometry.material = material;
  }

  attachPhysicsComponent() {
    this.aggregate = new PhysicsAggregate(
      this.geometry!,
      PhysicsShapeType.SPHERE,
      { mass: 1, restitution: 0.75 },
      this._scene
    );
  }
}
