import {
  Color3,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  StandardMaterial,
} from "@babylonjs/core";

class Pole {
  private _scene: Scene;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;

  constructor(scene: Scene) {
    this._scene = scene;
  }

  createGeometry() {
    this.geometry = MeshBuilder.CreateCylinder(
      "pole",
      {
        diameterTop: 2.5 * 0.5,
        diameterBottom: 2.5 * 0.5,
        height: 20,
        cap: Mesh.NO_CAP,
      },
      this._scene
    );

    const material = new StandardMaterial("netMat", this._scene);
    this.geometry.material = material;
    material.diffuseColor = Color3.White();
    material.alpha = 0.5;

    return this.geometry;
  }

  attachPhysicsComponent() {
    // throw new Error("Method not implemented.");
    this.aggregate = new PhysicsAggregate(
      this.geometry!,
      PhysicsShapeType.MESH,
      { mass: 0, restitution: 0.75 },
      this._scene
    );
  }
}

export default Pole;
