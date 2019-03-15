export default class Ship {
  public id: number;
  public shape: Cell[];
  public position: ShipPosition;
  public dead: boolean;
  public damaged: boolean;

  constructor(id: number, shape: Cell[]) {
    this.id = id;
    this.shape = shape.map(cell => {
      cell.damaged = false;
      return cell;
    });
    this.position = {
      x: 0,
      y: 0
    };
    this.dead = false;
    this.damaged = false;
  }
}

export interface ShipPosition {
  x: number;
  y: number;
}

export interface Cell {
  x: number;
  y: number;
  damaged?: boolean;
}
