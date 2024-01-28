import {
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";

class Board {
  private _scene: Scene;

  public geometry: Mesh | undefined;
  public aggregate: PhysicsAggregate | undefined;

  constructor(scene: Scene) {
    this._scene = scene;
  }

  public createGeometry(): Mesh {
    this.geometry = MeshBuilder.CreateBox(
      "board",
      {
        width: 10,
        height: 5,
        depth: 1,
        sideOrientation: Mesh.DOUBLESIDE,
      },
      this._scene
    );

    const material = new StandardMaterial("netMat", this._scene);

    const texture = new Texture(
      "backboard.png",
      this._scene,
      { noMipmap: false },
      true,
      Texture.TRILINEAR_SAMPLINGMODE
    );

    material.diffuseTexture = texture;

    this.geometry.material = material;

    return this.geometry;
  }

  public attachPhysicsComponent(): void {
    this.aggregate = new PhysicsAggregate(
      this.geometry!,
      PhysicsShapeType.BOX,
      { mass: 0, restitution: 0 },
      this._scene
    );
  }
}

export default Board;
