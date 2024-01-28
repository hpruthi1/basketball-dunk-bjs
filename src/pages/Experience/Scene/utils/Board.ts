import {
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  StandardMaterial,
  Texture,
  TransformNode,
} from "@babylonjs/core";

class Board {
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

    const material = new StandardMaterial("boardMat", this._scene);

    const texture = new Texture(
      "backboard.png",
      this._scene,
      { noMipmap: false },
      true,
      Texture.TRILINEAR_SAMPLINGMODE
    );

    material.diffuseTexture = texture;

    this.geometry.material = material;

    this.geometry.parent = this._parent;
    this.geometry.position.y = 18;
    this.geometry.position.z = -1;
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
