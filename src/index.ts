const fs = require("fs");

const POINTS = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
  LOSS: 0,
  DRAW: 3,
  WIN: 6,
};

export class Solution {
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

    // print all lines
    let fullyContainedSections = 0;
    lines.forEach((line) => {
      if (line) {
        const sections = line.split(",");
        const first = sections[0].split("-").map((value) => Number.parseInt(value));
        const second = sections[1].split("-").map((value) => Number.parseInt(value));

        const contains = this.contains(first, second);
        if (contains) {
          fullyContainedSections++;
        }
      }
    });

    return fullyContainedSections;
  }

  contains(first, second): boolean {
    const firstContainsSecond = first[0] <= second[0] && first[1] >= second[1];
    const secondContainsFirst = second[0] <= first[0] && second[1] >= first[1];

    return firstContainsSecond || secondContainsFirst;
  }
}
