import {
  Color3,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  StandardMaterial,
  TransformNode,
} from "@babylonjs/core";

class Ring {
  private _scene: Scene;
  private _parent: TransformNode;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;

  constructor(parent: TransformNode, scene: Scene) {
    this._scene = scene;
    this._parent = parent;

    this.createGeometry();
    this.attachPhysicsComponent();
  }

  public createGeometry() {
    this.geometry = MeshBuilder.CreateTorus(
      "ring",
      {
        thickness: 0.25,
        diameter: 2,
      },
      this._scene
    );

    const material = new StandardMaterial("ringMat", this._scene);
    this.geometry.material = material;
    material.diffuseColor = Color3.Red();

    this.geometry.parent = this._parent;
    this.geometry.position.y = 16;
    this.geometry.position.z = -2.5;
  }

  public attachPhysicsComponent() {
    // throw new Error("Method not implemented.");
    this.aggregate = new PhysicsAggregate(
      this.geometry!,
      PhysicsShapeType.MESH,
      { mass: 0, restitution: 0.75 },
      this._scene
    );
  }
}

export default Ring;
