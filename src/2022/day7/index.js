import fs from "node:fs";

export async function run() {
  const input = fs
    .readFileSync(new URL(`./input.txt`, import.meta.url), "utf8")
    .trim();
  const result1 = await resolveFirstChallenge(input);
  if (result1) {
    console.log(`The result of part 1 is ${result1}`);
  }
  const result2 = await resolveSecondChallenge(input);
  if (result2) {
    console.log(`The result of part 2 is ${result2}`);
  }
}

class Directory {
  constructor(label, parent) {
    this.label = label;
    this.parent = parent;
    this.children = [];
    this.size = 0;
  }
}

function buildFilesystem(input) {
  const relevantInput = input.filter(
    (command) => !command.startsWith("dir") && !command.startsWith("$ ls"),
  );

  const filesystem = new Directory("/", null);

  let workingDirectory = null;
  for (const command of relevantInput) {
    if (command.startsWith("$ cd")) {
      const [, , newDirectoryLabel] = command.split(" ");

      if (newDirectoryLabel === "/") {
        workingDirectory = filesystem;
      } else if (newDirectoryLabel === "..") {
        workingDirectory = workingDirectory.parent;
      } else {
        const newDirectory = new Directory(newDirectoryLabel, workingDirectory);
        workingDirectory.children.push(newDirectory);
        workingDirectory = newDirectory;
      }
    } else {
      const [filesize] = command.split(" ");

      let current = workingDirectory;
      while (current.parent) {
        current.size += Number(filesize);
        current = current.parent;
      }
      current.size += Number(filesize);
    }
  }

  return filesystem;
}

function analyzeFilesystem(filesystem, action) {
  action(filesystem);

  for (const child of filesystem.children) {
    analyzeFilesystem(child, action);
  }
}

async function resolveFirstChallenge(input) {
  const filesystem = buildFilesystem(input.split(/\r?\n/));

  let total = 0;

  analyzeFilesystem(filesystem, (directory) => {
    if (directory.size <= 100_000) total += directory.size;
  });

  // console.log(`The size of the full directory is ${total}`);

  return total;
}

async function resolveSecondChallenge(input) {
  const filesystem = buildFilesystem(input.split(/\r?\n/));

  const currentSpace = 70_000_000 - filesystem.size;
  const requiredSpace = 30_000_000 - currentSpace;
  const candidates = [];

  analyzeFilesystem(filesystem, (directory) => {
    if (directory.size >= requiredSpace) candidates.push(directory);
  });

  const selectedFolder = Math.min(
    ...candidates.map((candidate) => candidate.size),
  );

  // console.log(`The folder you have to delete is ${selectedFolder}`);

  return selectedFolder;
}
