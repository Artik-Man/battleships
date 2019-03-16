import { Component } from '@angular/core';
import { GameGeneratorService } from './services/gameGenerator';
import { Ship, Cell, Point } from './models/ship';
import { GameService, BattleFieldCell, GameState } from './services/gameState';
import { Bot } from './services/bot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public gameIsStarted = false;
  public winner: string;
  public battleFields: {
    [player: string]: {
      title: string,
      cells: BattleFieldCell[],
      isEnemy: boolean
    }
  } = {
      player: {
        title: 'Player',
        cells: [],
        isEnemy: false
      },
      enemy: {
        title: 'Enemy',
        cells: [],
        isEnemy: true
      }
    };

  constructor(
    private generator: GameGeneratorService,
    private game: GameService,
    private bot: Bot
  ) { }

  public restart() {
    this.winner = null;
    this.gameIsStarted = true;
    this.bot.restart();
    const battlefields = this.generator.startGame();
    this.game.newGame(battlefields.playerShips, battlefields.enemyShips);
    this.battleFields.player.cells = this.game.getPlayerBattleField();
    this.battleFields.enemy.cells = this.game.getEnemyBattleField();
  }

  public playerFire(point: Point) {
    const hit = this.game.playerFire(point);
    if (!hit) {
      this.bot.myTurn((p: Point) => {
        return this.game.enemyFire(p);
      });
    }
    this.gameStateReaction();
  }

  private gameStateReaction() {
    const state: GameState = this.game.checkGameState();
    switch (state) {
      default:
      case GameState.GameContinues:
        break;
      case GameState.PlayerWin:
        this.winner = this.battleFields.player.title;
        break;
      case GameState.EnemyWin:
        this.winner = this.battleFields.enemy.title;
    }
  }

}
