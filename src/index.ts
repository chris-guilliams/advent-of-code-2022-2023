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
    for (let x = 0; x < forest.length; x++) {
      let tallestFromWest = -1;
      for (let y = 0; y < forest[x].length; y++) {
        // console.log(tree.value);
        const tree = this.forest[x][y];
        if (tree.value > tallestFromWest) {
          tree.visibleFromWest = true;
          tallestFromWest = tree.value;
          console.log("tree ", tree.value, " at: ", x, ",", y, " is visible from the east");
        }
      }
    }

    for (let y = 0; y < forest.length; y++) {
      let tallestFromNorth = -1;
      for (let x = 0; x < forest[y].length; x++) {
        // console.log(tree.value);
        const tree = this.forest[x][y];
        if (tree.value > tallestFromNorth) {
          tree.visibleFromNorth = true;
          tallestFromNorth = tree.value;
          console.log("tree ", tree.value, " at: ", x, ",", y, " is visible from the North");
        }
      }
    }

    for (let x = forest.length - 1; x > 0; x--) {
      let tallestFromSouth = -1;
      for (let y = forest[x].length - 1; y > 0; y--) {
        // console.log(tree.value);
        const tree = this.forest[x][y];
        if (tree.value > tallestFromSouth) {
          tree.visibleFromWest = true;
          tallestFromSouth = tree.value;
          console.log("tree ", tree.value, " at: ", x, ",", y, " is visible from the South");
        }
      }
    }

    for (let y = forest.length - 1; y > 0; y--) {
      let tallestFromEast = -1;
      for (let x = forest[y].length - 1; x > 0; x--) {
        // console.log(tree.value);
        const tree = this.forest[x][y];
        if (tree.value > tallestFromEast) {
          tree.visibleFromEast = true;
          tallestFromEast = tree.value;
          console.log("tree ", tree.value, " at: ", x, ",", y, " is visible from the East");
        }
      }
    }

    console.log(this.forest);
    let numberOfTreesVisible = 0;
    for (let row of this.forest) {
      for (let tree of row) {
        const visible = tree.visibleFromEast || tree.visibleFromNorth || tree.visibleFromSouth || tree.visibleFromWest;
        if (visible) {
          numberOfTreesVisible++;
        }
      }
    }
    return numberOfTreesVisible;
  }
}
