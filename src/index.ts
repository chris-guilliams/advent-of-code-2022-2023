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
    let scores = new Array<number>();
    // print all lines
    let currentScore = 0;
    lines.forEach((line, i) => {
      const left = line.substring(0, line.length / 2);
      const right = line.substring(line.length / 2);

      if ((i + 1) % 3 === 0) {
        for (let char of line) {
          if (lines[i - 2].includes(char) && lines[i - 1].includes(char)) {
            scores.push(this.getPriorityScore(char));
            break;
          }
        }
      }
    });
    console.log(scores);
    const total = scores.reduce((a, b) => a + b);

    return total;
  }

  getPriorityScore(char: string): number {
    let score = char.codePointAt(0);
    if (score > 96) {
      return score - 96;
    } else {
      return score - 38;
    }
  }
}
