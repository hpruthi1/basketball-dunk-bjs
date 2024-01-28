import Player from "../player/Player";

class GameManager {
  public player: Player;
  private score: number = 0;

  constructor(player: Player) {
    this.player = player;
  }

  get Score() {
    return this.score;
  }

  set Score(newScore: number) {
    this.score = newScore;
  }

  restartGame() {
    this.player.respawn();
  }
}

export default GameManager;
