const fs = require("fs");

type File = {
  type: "File";
  size: number;
  name: string;
};

type Directory = {
  type: "Directory";
  size: number;
  name: string;
  contents: Array<Content>;
  parent: Directory;
};

type Content = File | Directory;

export class Solution {
  private fileSystem: Directory = {
    type: "Directory",
    size: 0,
    name: "/",
    contents: new Array<Content>(),
    parent: undefined,
  };

  private currentDirectory: Directory = this.fileSystem;
  private totalSizeOfSmallContents = 0;
  private directorySizes = new Array<number>();

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

    lines.forEach((line) => {
      if (line) {
        // determine what type of instruction it is
        const commands = line.split(" ");
        // if starts with $ it is a command
        if (commands[0] === "$") {
          // console.log("instruction: ", commands);
          switch (commands[1]) {
            case "cd":
              switch (commands[2]) {
                case "/":
                  this.currentDirectory = this.fileSystem;
                  break;
                case "..":
                  this.currentDirectory = this.currentDirectory.parent;
                  break;
                default:
                  // console.log("changed directory from: ", this.currentDirectory, " to: ");
                  this.currentDirectory = this.currentDirectory.contents[commands[2]] as Directory;
              }
              break;
            case "ls":
            // do nothing
          }
        } else {
          if (commands[0] === "dir") {
            const directory: Directory = {
              type: "Directory",
              size: 0,
              name: commands[1],
              contents: new Array<Content>(),
              parent: this.currentDirectory,
            };
            // console.log("command:", commands);
            this.currentDirectory.contents[directory.name] = directory;
          } else {
            const file = {
              type: "File",
              size: Number.parseInt(commands[0]),
              name: commands[1],
            };

            let tempDirectory = this.currentDirectory;
            this.currentDirectory.contents[file.name] = file;
            if (tempDirectory.size <= 100000) {
              this.totalSizeOfSmallContents -= tempDirectory.size;
            }
            tempDirectory.size += file.size;
            if (tempDirectory.size <= 100000) {
              this.totalSizeOfSmallContents += tempDirectory.size;
            }

            while (tempDirectory.parent) {
              tempDirectory = tempDirectory.parent;
              if (tempDirectory.size <= 100000) {
                this.totalSizeOfSmallContents -= tempDirectory.size;
              }
              tempDirectory.size += file.size;
              if (tempDirectory.size <= 100000) {
                this.totalSizeOfSmallContents += tempDirectory.size;
              }
            }
          }
        }
      }
    });

    // push directory sizes as numbers to array instead of accumulating
    this.currentDirectory = this.fileSystem;
    const flatDirectorySizes = this.getFlatDirectorySizes(this.fileSystem);
    // console.log(this.directorySizes);

    let sizeForDeletion = this.fileSystem.size;
    const amountOfSpaceFree = 70000000 - this.fileSystem.size;
    const amountOfSpaceNeeded = 30000000 - amountOfSpaceFree;
    for (const size of this.directorySizes) {
      if (size > amountOfSpaceNeeded && size < sizeForDeletion) {
        sizeForDeletion = size;
      }
    }
    return sizeForDeletion;
  }

  private getFlatDirectorySizes(directory: Directory): Array<number> {
    const sizes = new Array<number>();
    // const items = directory.contents.

    const tempDirectory = directory;
    const directories = new Array<Directory>();
    for (const child in tempDirectory.contents) {
      const value = tempDirectory.contents[child];
      if (value.type === "Directory") {
        this.directorySizes.push(value.size);
        this.getFlatDirectorySizes(value);
      }
    }
    // console.log(directories);
    while (directories.length) {
      for (const child of directories) {
        // const childValue = directories[child];
        this.directorySizes.push(child.size);
        this.getFlatDirectorySizes(child as Directory);
      }
    }
    const values = directory.contents.map((value) => console.log(value));
    // directory.contents.entries().flatMap((value) => {
    //   console.log(value);
    // });
    return [];
  }

  private pushDirectorySizes(directory: Directory): void {}
}
