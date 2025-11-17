import type { Command } from "../interfaces/command";

export class SpeedBoostDecorator implements Command {
  private wrappedCommand: Command;

  constructor(wrappedCommand: Command) {
    this.wrappedCommand = wrappedCommand;
  }

  canExecute(): boolean {
    return this.wrappedCommand.canExecute();
  }

  execute(): void {
    while (this.wrappedCommand.canExecute()) {
      this.wrappedCommand.execute();
    }
  }
}