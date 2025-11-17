
// STATE PATTERN: Piece States
export abstract class PieceState {
  abstract canMove(): boolean;
  abstract canRotate(): boolean;
}

export class FallingState extends PieceState {
  canMove() { return true; }
  canRotate() { return true; }
}

export class LandedState extends PieceState {
  canMove() { return false; }
  canRotate() { return false; }
}