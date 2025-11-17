export interface Command {
  execute(): void;
  canExecute(): boolean;
}