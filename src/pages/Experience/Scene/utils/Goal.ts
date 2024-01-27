import { Scene, TransformNode } from "@babylonjs/core";
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

  instantiate() {
    this.pole = new Pole(this._scene);
    const poleMesh = this.pole.createGeometry();

    poleMesh.position.y = 8;
    poleMesh.parent = this;

    this.pole.attachPhysicsComponent();

    this.net = new Net(this._scene);
    const netMesh = this.net.createGeometry();
    netMesh.position.y = 15;
    netMesh.position.z = -2.5;
    netMesh.parent = this;

    this.net.attachPhysicsComponent();

    this.backboard = new Board(this._scene);
    const boardMesh = this.backboard.createGeometry();
    boardMesh.position.y = 18;
    boardMesh.position.z = -1;
    boardMesh.parent = this;

    this.backboard.attachPhysicsComponent();

    this.ring = new Ring(this._scene);
    const ringMesh = this.ring.createGeometry();
    ringMesh.position.y = 16;
    ringMesh.position.z = -2.5;
    ringMesh.parent = this;

    this.ring.attachPhysicsComponent();
  }
}

export default Goal;
