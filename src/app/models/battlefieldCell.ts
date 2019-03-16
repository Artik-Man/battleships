export class BattleFieldCell {
  public x: number;
  public y: number;
  public shipHere = false;
  public shipDamaged = false;
  public shipDied = false;
  public miss = false;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
