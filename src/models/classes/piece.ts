import type { Position } from "../interfaces/cellValue";
import { FallingState, type PieceState } from "./pieceState";
import type { BlockType } from "../types/blocktype";

// COMPOSITE PATTERN: Piece & Grid 
export class Piece {
  public type: BlockType;
  public blocks: Position[];
  public color: string;
  public position: Position;
  public state: PieceState;

  constructor(
    type: BlockType,
    blocks: Position[],
    color: string,
    position: Position = { x: 3, y: 0 },
    state: PieceState = new FallingState()
  ) {
    this.type = type;
    this.blocks = blocks;
    this.color = color;
    this.position = position;
    this.state = state;
  }

  getAbsoluteBlocks(): Position[] {
    return this.blocks.map(b => ({
      x: b.x + this.position.x,
      y: b.y + this.position.y
    }));
  }

  setState(state: PieceState) {
    this.state = state;
  }

  clone(): Piece {
    return new Piece(
      this.type,
      this.blocks.map(b => ({...b})),
      this.color,
      {...this.position},
      this.state
    );
  }
}