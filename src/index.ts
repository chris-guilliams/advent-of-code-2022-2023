const fs = require('fs')

export class Solution {
  readInput(file: string): Array<string> {
    let input = fs.readFileSync(file, 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return err
      }
    });

    return input.split(/\r?\n/);
  }

  solve(file: string): number {
    const lines = this.readInput(file);
    let calories = new Array<number>();
    // print all lines
    let currentCalories = 0;
    lines.forEach((line) => {
      const calorieEntry = Number(line);
      if (calorieEntry) {
        currentCalories += calorieEntry;
      } else {
        calories.push(currentCalories);
        currentCalories = 0;
      }
    });

    return Math.max(...calories);
  }
}

