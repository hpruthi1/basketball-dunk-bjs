import {
  Mesh,
  MeshBuilder,
  PBRMaterial,
  PhysicsAggregate,
  PhysicsMotionType,
  PhysicsShapeType,
  Scene,
  Texture,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";
import InputManager from "../managers/InputManager";
import { IInputReceiver } from "../interfaces/IInputReceiver";

export class Ball implements IInputReceiver {
  private _scene: Scene;
  private _camera: UniversalCamera;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;

  public throwForce = 30;
  public canShoot = true;

  constructor(inputManager: InputManager, scene: Scene) {
    this._scene = scene;
    this._camera = this._scene.activeCamera as UniversalCamera;
    this.createGeometry();
    this.attachPhysicsComponent();

    inputManager.setInputReceiver(this);
  }

  handleKeyboardEvent(code: string, pressed: boolean): void {
    console.log(code, pressed);
    if (code === "Space" && pressed && this.canShoot) {
      this.aggregate?.body.applyImpulse(
        this._camera
          .getDirection(Vector3.Forward())
          .normalize()
          .scale(this.throwForce),
        this.geometry!.getAbsolutePosition()
      );
      this.canShoot = false;

      setTimeout(() => {
        this.canShoot = true;
      }, 1500);
    }
    // console.log(this._camera.getDirection(Vector3.Forward()).normalize());
  }

  inputReceiverInit(): void {
    console.log("Display UI");
  }

  createGeometry() {
    this.geometry = MeshBuilder.CreateSphere(
      "ball",
      { diameter: 0.95, segments: 32 },
      this._scene
    );

    // const net = this._scene.getMeshByName("net");
    // const netPos = net?.getAbsolutePosition();
    // if (netPos)
    //   this.geometry.position = new Vector3(netPos.x, netPos.y + 3, netPos.z);

    this.geometry.rotation = new Vector3(
      Math.PI * 0.5,
      this.geometry.rotation.y,
      Math.PI * 0.25
    );

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
      { mass: 1, restitution: 0 },
      this._scene
    );

    this.aggregate.body.setMotionType(PhysicsMotionType.DYNAMIC);

    this.aggregate.body.setCollisionCallbackEnabled(true);
  }
}
