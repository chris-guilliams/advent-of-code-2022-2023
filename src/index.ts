const fs = require("fs");

// A = Rock = 1
// B = Paper = 2
// C = Scissors = 3
// X = Lose
// Y = Draw
// Z = Win
// Loss = 0, Tie = 3, Win = 6
const outcomes = [
  { round: 'A X', score: 3 },
  { round: 'A Y', score: 4 },
  { round: 'A Z', score: 8 },
  { round: 'B X', score: 1 },
  { round: 'B Y', score: 5 },
  { round: 'B Z', score: 9 },
  { round: 'C X', score: 2 },
  { round: 'C Y', score: 6 },
  { round: 'C Z', score: 7 },
]

export class Solution {

  constructor() { }

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
    let score = 0;
    lines.forEach((line, index) => {
      if (line) {
        // TODO: logic for each line goes here
        const result = outcomes.find((outcome) => {
          return outcome.round == line;
        });
        score += result.score;
      }
    });

    return score;
  }
}
