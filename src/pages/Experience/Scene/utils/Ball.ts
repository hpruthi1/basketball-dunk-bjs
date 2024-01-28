import {
  Mesh,
  MeshBuilder,
  Observable,
  PBRMaterial,
  PhysicsAggregate,
  PhysicsMotionType,
  PhysicsShapeType,
  Scene,
  Texture,
  UniversalCamera,
  Vector3,
} from "@babylonjs/core";

export class Ball {
  private _scene: Scene;
  private _camera: UniversalCamera;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;

  public observable: Observable<unknown> | undefined;

  constructor(scene: Scene) {
    this._scene = scene;
    this._camera = this._scene.activeCamera as UniversalCamera;
    this.createGeometry();
    this.attachPhysicsComponent();
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

    this.observable = new Observable();
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

  shoot(force: number = 30) {
    this.aggregate?.body.applyImpulse(
      this._camera.getDirection(Vector3.Forward()).normalize().scale(force),
      this.geometry!.getAbsolutePosition()
    );
  }
}
