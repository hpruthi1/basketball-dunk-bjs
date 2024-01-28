import Player from "../player/Player";
import SfxSystem from "../systems/sound-effects-system";

class GameManager {
  public player: Player;
  private _sfxSystem: SfxSystem;

  private score: number = 0;

  constructor(player: Player, sfxSystem: SfxSystem) {
    this.player = player;
    this._sfxSystem = sfxSystem;
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
