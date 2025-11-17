// COMMAND PATTERN: Game Commands

import type { Command } from "../interfaces/command";
import type { CellValue } from "../types/cellvalue";
import type { Piece } from "./piece";


export class MoveCommand implements Command {
  private piece: Piece;
  private dx: number;
  private dy: number;
  private grid: CellValue[][];
  private updatePiece: (p: Piece) => void;

  constructor(
    piece: Piece,
    dx: number,
    dy: number,
    grid: CellValue[][],
    updatePiece: (p: Piece) => void
  ) {
    this.piece = piece;
    this.dx = dx;
    this.dy = dy;
    this.grid = grid;
    this.updatePiece = updatePiece;
  }
   canExecute(): boolean {
    if (!this.piece.state.canMove()) return false;
    const newPiece = this.piece.clone();
    newPiece.position.x += this.dx;
    newPiece.position.y += this.dy;
    return !this.checkCollision(newPiece);
  }

  execute(): void {
    if (this.canExecute()) {
      const newPiece = this.piece.clone();
      newPiece.position.x += this.dx;
      newPiece.position.y += this.dy;
      this.updatePiece(newPiece);
    }
  }

  private checkCollision(piece: Piece): boolean {
    return piece.getAbsoluteBlocks().some(b => 
      b.x < 0 || b.x >= 10 || b.y >= 20 || 
      (b.y >= 0 && this.grid[b.y]?.[b.x] !== null)
    );
  }
}