import type { BlockType } from "./types/blocktype";


export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 20;
export const CELL_SIZE = 6;
export const FALL_SPEED = 500;

export const TETROMINO_COLORS: Record<BlockType, string> = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  L: '#f0a000',
  J: '#0000f0'
};