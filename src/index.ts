const fs = require('fs')

const POINTS = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
  LOSS: 0,
  DRAW: 3,
  WIN: 6
};

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
    let scores = new Array<number>();
    // print all lines
    let currentCalories = 0;
    lines.forEach((line) => {
      const game = line.split(' ');
      if (game) {
        scores.push(this.determineScore(game[0], game[1]));
      }
    });

    const total = scores.reduce((a, b) => a + b);

    return total;
  }

  determineScore(player1: string, player2: string): number {
    let score = 0;
    switch (player2) {
      case 'X':
        score += 0;
        switch (player1) {
          case 'A':
            score += 3;
            break;
          case 'B':
            score += 1;
            break;
          case 'C':
            score += 2;
            break;
          default:
        }
        break;
      case 'Y':
        score += 3;
        switch (player1) {
          case 'A':
            score += 1;
            break;
          case 'B':
            score += 2;
            break;
          case 'C':
            score += 3;
            break;
          default:
        }
        break;
      case 'Z':
        score += 6;
        switch (player1) {
          case 'A':
            score += 2;
            break;
          case 'B':
            score += 3;
            break;
          case 'C':
            score += 1;
            break;
          default:
        }
        break;
      default:
    }

    return score;
  }
}

