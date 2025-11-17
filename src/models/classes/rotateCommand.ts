import type { Command } from "../interfaces/command";
import type { CellValue } from "../types/cellvalue";
import type { Piece } from "./piece";


export class RotateCommand implements Command {
  private piece: Piece;
  private grid: CellValue[][];
  private updatePiece: (p: Piece) => void;

  constructor(
    piece: Piece,
    grid: CellValue[][],
    updatePiece: (p: Piece) => void
  ) {
    this.piece = piece;
    this.grid = grid;
    this.updatePiece = updatePiece;
  }

  canExecute(): boolean {
    if (!this.piece.state.canRotate() || this.piece.type === 'O') return false;
    const rotated = this.getRotatedPiece();
    return !this.checkCollision(rotated);
  }

  execute(): void {
    if (this.canExecute()) {
      this.updatePiece(this.getRotatedPiece());
    }
  }

  private getRotatedPiece(): Piece {
    const newPiece = this.piece.clone();
    newPiece.blocks = newPiece.blocks.map(b => ({
      x: -b.y,
      y: b.x
    }));
    return newPiece;
  }

  private checkCollision(piece: Piece): boolean {
    return piece.getAbsoluteBlocks().some(b => 
      b.x < 0 || b.x >= 10 || b.y >= 20 || 
      (b.y >= 0 && this.grid[b.y]?.[b.x] !== null)
    );
  }
}
