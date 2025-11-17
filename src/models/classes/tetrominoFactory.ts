import type { Shape } from "../interfaces/cellValue";
import type { BlockType } from "../types/blocktype";
import { Piece } from "./piece";


// ============ FACTORY PATTERN: Piece Factory ============
export class TetrominoFactory {
  private static shapes: Record<BlockType, Shape> = {
    I: { blocks: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}], color: '#00f0f0' },
    O: { blocks: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], color: '#f0f000' },
    T: { blocks: [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}], color: '#a000f0' },
    S: { blocks: [{x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}], color: '#00f000' },
    Z: { blocks: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}], color: '#f00000' },
    L: { blocks: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}], color: '#f0a000' },
    J: { blocks: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 0, y: 2}], color: '#0000f0' }
  };

  static createPiece(): Piece {
    const types: BlockType[] = ['I', 'O', 'T', 'S', 'Z', 'L', 'J'];
    const type = types[Math.floor(Math.random() * types.length)];
    const shape = this.shapes[type];
    return new Piece(type, shape.blocks, shape.color);
  }
}