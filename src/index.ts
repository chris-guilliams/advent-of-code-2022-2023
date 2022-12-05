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

  solve(file: string): string {
    const lines = this.readInput(file);

    let readingInstructions = false;

    lines.forEach((line) => {
      if (line && !readingInstructions) {
        for (let i = 0; i < line.length; i++) {
          const char = line.charAt(i);
          if (char === "[") {
            const stack = i / 4;
            this.stacks[stack] = [line.charAt(i + 1)].concat(this.stacks[stack]);
          }
        }
      } else if (line && readingInstructions) {
        const segments = line.split(" ");
        const amount = Number.parseInt(segments[1]);
        const stackToTakeFrom = Number.parseInt(segments[3]) - 1;
        const stackToMoveTo = Number.parseInt(segments[5]) - 1;

        let containers = new Array<string>();
        for (let i = 0; i < amount; i++) {
          containers.push(this.stacks[stackToTakeFrom].pop());
        }

        this.stacks[stackToMoveTo] = this.stacks[stackToMoveTo].concat(containers.reverse());
      } else {
        readingInstructions = true;
      }
    });

    const answer = this.getSolution(this.getStacks());
    return answer;
  }

  getSolution(stacks: Array<Array<string>>): string {
    return this.stacks.map((value) => value.pop()).join("");
  }

  getStacks(): Array<Array<string>> {
    return this.stacks;
  }
}
