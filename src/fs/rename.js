import fs from "fs";
import path from "path";
import util from "util";

const rename = util.promisify(fs.rename);
const stat = util.promisify(fs.stat);

const renameFile = async () => {
  const dir = "./src/fs/files";
  const oldFilePath = path.join(dir, "wrongFilename.txt");
  const newFilePath = path.join(dir, "properFilename.txt");

  try {
    // Проверяем, существует ли файл
    await stat(oldFilePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed: fileToRename.txt does not exist");
    }
    throw err;
  }

  // Переименовываем файл
  await rename(oldFilePath, newFilePath);
  console.log("File renamed successfully.");
};

renameFile().catch((err) => console.error(err.message));
