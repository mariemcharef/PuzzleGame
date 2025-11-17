// Game Types
export interface GameState {
  enter(game: Game): void;
  exit(game: Game): void;
  update(game: Game): void;
  handleInput(game: Game, key: string): void;
}

export interface Game {
  state: GameState;
  player: Player | null;
  level: Level | null;
  scoreManager: ScoreManager;
  applyPowerUp(type: PowerUpType): void;
}

export interface Character {
  x: number;
  y: number;
  baseSpeed: number;
  baseStrength: number;
  getSpeed(): number;
  getStrength(): number;
  hasShield(): boolean;
  render(ctx: CanvasRenderingContext2D): void;
}

export interface PlayerState {
  enter(player: Player): void;
  exit(player: Player): void;
  update(player: Player): void;
  handleInput(player: Player, keys: Record<string, boolean>): void;
}

export interface Player extends Character {
  state: PlayerState;
  velocityX: number;
  velocityY: number;
  groundY: number;
  direction: 'left' | 'right';
  decorators: PowerUpDecorator[];
  changeState(newState: PlayerState): void;
  update(keys: Record<string, boolean>): void;
  applyDecorator(decorator: PowerUpDecorator): void;
}

export type PowerUpType = 'shield' | 'speed' | 'fire';

export interface PowerUpDecorator extends Character {
  decoratedCharacter: Character;
  duration: number;
  startTime: number;
  isExpired(): boolean;
  getRemainingTime(): number;
}

export interface GameComponent {
  name: string;
  children: GameComponent[];
  add(component: GameComponent): void;
  remove(component: GameComponent): void;
  update(game: Game): void;
  render(ctx: CanvasRenderingContext2D): void;
}

export interface Level extends GameComponent {
  number: number;
}

export interface Enemy extends GameComponent {
  x: number;
  y: number;
  type: string;
  health: number;
  active: boolean;
}

export interface ScoreManager {
  observers: Observer[];
  addObserver(observer: Observer): void;
  notifyObservers(data: { score: number }): void;
}

export interface Observer {
  update(data: { score: number }): void;
}