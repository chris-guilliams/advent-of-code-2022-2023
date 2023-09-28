const fs = require("fs");

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

    lines.forEach((line, index) => {
      if (line) {
        // TODO: logic for each line goes here
      }
    });

    const answer = 42;
    return answer;
  }
}
