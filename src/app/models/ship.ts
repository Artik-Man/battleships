export class Ship {
  public id: number;
  public shape: Cell[];
  public position: Point;
  public died: boolean;
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
    this.died = false;
    this.damaged = false;
  }
}

export interface Point {
  x: number;
  y: number;
}

export interface Cell {
  x: number;
  y: number;
  damaged?: boolean;
}
