import fs from "fs";
import path from "path";
import util from "util";

const unlink = util.promisify(fs.unlink);
const stat = util.promisify(fs.stat);

const remove = async () => {
  const dir = "./src/fs/files";
  const filePath = path.join(dir, "fileToRemove.txt");

  try {
    // Проверяем, существует ли файл
    await stat(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed: fileToRemove.txt does not exist");
    }
    throw err;
  }

  // Удаляем файл
  await unlink(filePath);
};

remove().catch((err) => console.error(err.message));
