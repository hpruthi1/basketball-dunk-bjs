import {
  Color3,
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  StandardMaterial,
} from "@babylonjs/core";

class Net {
  private _scene: Scene;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;
  constructor(scene: Scene) {
    this._scene = scene;
  }
  createGeometry() {
    this.geometry = MeshBuilder.CreateCylinder(
      "net",
      {
        diameterTop: 2,
        diameterBottom: 2 * 0.5,
        height: 2,
        cap: Mesh.NO_CAP,
        sideOrientation: Mesh.DOUBLESIDE,
        subdivisions: 8,
        hasRings: true,
      },
      this._scene
    );

    const material = new StandardMaterial("netMat", this._scene);
    this.geometry.material = material;
    material.diffuseColor = Color3.White();
    material.alpha = 0.5;
    this.geometry.material.wireframe = true;

    return this.geometry;
  }

  attachPhysicsComponent() {
    // throw new Error("Method not implemented.");
    this.aggregate = new PhysicsAggregate(
      this.geometry!,
      PhysicsShapeType.MESH,
      { mass: 1, restitution: 0.75 },
      this._scene
    );

    return this.aggregate;
  }
}

export default Net;
