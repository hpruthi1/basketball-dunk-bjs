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
    this.pole = new Pole(this, this._scene);

    this.net = new Net(this, this._scene);

    this.backboard = new Board(this, this._scene);

    this.ring = new Ring(this, this._scene);

    this.createColliders();
  }

  private createColliders(): void {
    const sensor1 = MeshBuilder.CreateDisc("collider1", {
      radius: 0.75,
      sideOrientation: Mesh.DOUBLESIDE,
    });

    const ringPos = this.ring?.geometry?.getAbsolutePosition();
    sensor1.position = new Vector3(ringPos?.x, ringPos!.y + 0.02, ringPos?.z);

    sensor1.rotation.x = Math.PI / 2;

    sensor1.visibility = 0.1;

    const sensor2 = MeshBuilder.CreateDisc("collider2", {
      radius: 0.5,
      sideOrientation: Mesh.DOUBLESIDE,
    });

    const netPos = this.net?.geometry?.getAbsolutePosition();
    sensor2.position = new Vector3(netPos?.x, netPos!.y - 1, netPos?.z);
    sensor2.rotation.x = Math.PI / 2;

    sensor2.visibility = 0.1;

    new PhysicsAggregate(
      sensor1,
      PhysicsShapeType.MESH,
      { mass: 0, isTriggerShape: true },
      this._scene
    );

    new PhysicsAggregate(
      sensor2,
      PhysicsShapeType.MESH,
      { mass: 0, isTriggerShape: true },
      this._scene
    );
  }
}

export default Goal;
