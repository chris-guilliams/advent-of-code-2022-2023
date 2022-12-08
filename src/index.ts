const fs = require("fs");

type Tree = {
  visibleFromNorth: boolean;
  visibleFromEast: boolean;
  visibleFromSouth: boolean;
  visibleFromWest: boolean;
  value: number;
};

export class Solution {
  private forest = new Array<Array<Tree>>();

  constructor() {}

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
        this.forest.push(new Array<Tree>());
        this.forest[index] = new Array<Tree>();
        for (let i = 0; i < line.length; i++) {
          const cell = Number.parseInt(line.charAt(i));
          this.forest[index].push({
            visibleFromNorth: false,
            visibleFromEast: false,
            visibleFromSouth: false,
            visibleFromWest: false,
            value: cell,
          });
        }
      }
    });

    return this.getVisible(this.forest);
  }

  private getVisible(forest: Array<Array<Tree>>): number {
    let highestVisibility = 0;
    for (let x = 0; x < forest.length; x++) {
      for (let y = 0; y < forest[x].length; y++) {
        const visibility = this.calculateScenicScore(this.forest, x, y);
        if (visibility > highestVisibility) {
          highestVisibility = visibility;
        }
      }
    }
    return highestVisibility;
  }

  private calculateScenicScore(forest: Array<Array<Tree>>, x: number, y: number): number {
    const tree = forest[x][y];

    let treesToNorth = 0;

    for (let column = x - 1; column >= 0; column--) {
      if (tree.value > forest[column][y].value) {
        treesToNorth++;
      } else {
        treesToNorth++;
        break;
      }
    }

    let treesToWest = 0;

    for (let row = y - 1; row >= 0; row--) {
      if (tree.value > forest[x][row].value) {
        treesToWest++;
      } else {
        treesToWest++;
        break;
      }
    }

    let treesToSouth = 0;

    for (let column = x + 1; column < forest.length; column++) {
      if (tree.value > forest[column][y].value) {
        treesToSouth++;
      } else {
        treesToSouth++;
        break;
      }
    }

    let treesToEast = 0;

    for (let row = y + 1; row < forest[y].length; row++) {
      if (tree.value > forest[x][row].value) {
        treesToEast++;
      } else {
        treesToEast++;
        break;
      }
    }

    const scenicScore = treesToNorth * treesToWest * treesToSouth * treesToEast;
    return scenicScore;
  }
}
