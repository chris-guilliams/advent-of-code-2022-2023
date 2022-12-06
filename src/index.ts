const fs = require("fs");

export class Solution {
  private stacks = new Array<Array<string>>();

  constructor() {
    for (let i = 0; i < 11; i++) {
      this.stacks.push(new Array<string>());
    }
  }

  readInput(file: string): Array<string> {
    let input = fs.readFileSync(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return err;
      }
    });

    return input.split(/\r?\n/);
  }

  solve(file: string): number {
    const lines = this.readInput(file);

    let stack = new Array<string>();
    let index = 0;

    lines.forEach((line) => {
      if (line) {
        for (let char of line) {
          stack.unshift(char);
          if (index >= 4) {
            stack.pop();
          }
          index++;
          if (this.isMarker(stack)) {
            return index;
          }
        }
      }
    });

    return index;
  }

  isMarker(stream: Array<string>): boolean {
    return new Set(stream).size === 4;
  }
}
