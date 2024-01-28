import {
  Mesh,
  MeshBuilder,
  PhysicsAggregate,
  PhysicsShapeType,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";
import Pole from "./Pole";
import Net from "./Net";
import Board from "./Board";
import Ring from "./Ring";

class Goal extends TransformNode {
  public pole: Pole | undefined;
  public backboard: Board | undefined;
  public net: Net | undefined;
  public ring: Ring | undefined;

  public distanceFromPlayer = 33;

  constructor(scene: Scene) {
    super("Goal", scene);
    this.position.z = this.distanceFromPlayer;
    this.instantiate();
  }

  private instantiate(): void {
    this.pole = new Pole(this._scene);
    const poleMesh = this.pole.createGeometry();

    poleMesh.parent = this;
    poleMesh.position.y = 8;

    this.pole.attachPhysicsComponent();

    this.net = new Net(this._scene);
    const netMesh = this.net.createGeometry();
    netMesh.parent = this;
    netMesh.position.y = 15;
    netMesh.position.z = -2.5;

    this.net.attachPhysicsComponent();

    this.backboard = new Board(this._scene);
    const boardMesh = this.backboard.createGeometry();
    boardMesh.parent = this;
    boardMesh.position.y = 18;
    boardMesh.position.z = -1;

    this.backboard.attachPhysicsComponent();

    this.ring = new Ring(this._scene);
    const ringMesh = this.ring.createGeometry();
    ringMesh.parent = this;
    ringMesh.position.y = 16;
    ringMesh.position.z = -2.5;

    this.ring.attachPhysicsComponent();

    this.createColliders();
  }

  private createColliders(): void {
    const collider1 = MeshBuilder.CreateDisc("collider1", {
      radius: 0.75,
      sideOrientation: Mesh.DOUBLESIDE,
    });

    const ringPos = this.ring?.geometry?.getAbsolutePosition();
    collider1.position = new Vector3(ringPos?.x, ringPos!.y + 0.02, ringPos?.z);

    collider1.rotation.x = Math.PI / 2;

    collider1.visibility = 0.1;

    const collider2 = MeshBuilder.CreateDisc("collider2", {
      radius: 0.5,
      sideOrientation: Mesh.DOUBLESIDE,
    });

    const netPos = this.net?.geometry?.getAbsolutePosition();
    collider2.position = new Vector3(netPos?.x, netPos!.y - 1, netPos?.z);
    collider2.rotation.x = Math.PI / 2;

    collider2.visibility = 0.1;

    const physicsCollider1 = new PhysicsAggregate(
      collider1,
      PhysicsShapeType.MESH,
      { mass: 0, isTriggerShape: true },
      this._scene
    );

    const physicsCollider2 = new PhysicsAggregate(
      collider2,
      PhysicsShapeType.MESH,
      { mass: 0, isTriggerShape: true },
      this._scene
    );
  }
}

export default Goal;
