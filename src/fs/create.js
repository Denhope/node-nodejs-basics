import fs from "fs";
import path from "path";
import util from "util";

const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);

const create = async () => {
  //Path to directory relative to create.js file
  const dir = path.resolve("./src/fs/files");
  const filePath = path.join(dir, "fresh.txt");
  const content = "I am fresh and young";

  try {
    // Check if the folder exists
    await stat(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      // If the folder does not exist, create it
      await mkdir(dir, { recursive: true });
    } else {
      throw err;
    }
  }

  try {
    // Check if the file exists
    await stat(filePath);
    throw new Error("FS operation failed: fresh.txt already exists");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  // Create a file with contents
  await writeFile(filePath, content, "utf8");
};

create().catch((err) => console.error(err.message));
