import {
  Color3,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  StandardMaterial,
} from "@babylonjs/core";

class Ring {
  private _scene: Scene;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;

  constructor(scene: Scene) {
    this._scene = scene;
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

    const material = new StandardMaterial("netMat", this._scene);
    this.geometry.material = material;
    material.diffuseColor = Color3.Red();

    return this.geometry;
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
