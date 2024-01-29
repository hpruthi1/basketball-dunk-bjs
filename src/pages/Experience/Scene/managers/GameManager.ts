import { HavokPlugin } from "@babylonjs/core";
import Player from "../player/Player";

class GameManager {
  public player: Player;

  private _havokPlugin: HavokPlugin | undefined;

  private _score: number = 0;

  constructor(havok: HavokPlugin, player: Player) {
    this.player = player;
    this._havokPlugin = havok;
    this.listenEventsOnBall();
  }

  get score() {
    return this._score;
  }

  set score(newScore: number) {
    this._score = newScore;
  }

  restartGame() {
    this.player.respawn();
  }

  listenEventsOnBall() {
    this._havokPlugin?.onTriggerCollisionObservable.add((collisionEvent) => {
      if (collisionEvent.type === "TRIGGER_EXITED") {
        if (
          collisionEvent.collider.transformNode.name ===
            this.player.ball.geometry?.name &&
          collisionEvent.collidedAgainst.transformNode.name === "collider1"
        ) {
          this.player.ball.geometry.metadata = {
            ...this.player.ball.geometry.metadata,
            passthroughSensor1: true,
          };
        } else if (
          collisionEvent.collidedAgainst.transformNode.name === "collider2"
        ) {
          this.player.ball.geometry!.metadata = {
            ...this.player.ball.geometry!.metadata,
            passthroughSensor2: true,
          };
        }
      }
    });
  }
}

export default GameManager;
