export default class Ship {
  public shape: Shape;
  public position: ShipPosition;
  public dead = false;

  constructor(shape: Shape, position: ShipPosition) {
    this.shape = shape;
    this.position = position;
  }
}

export interface ShipPosition {
  x: number;
  y: number;
}

interface Shape {
  cells: Cell[];
}

interface Cell extends ShipPosition {
  damaged: boolean;
}
