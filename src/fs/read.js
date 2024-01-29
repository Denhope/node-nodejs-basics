import fs from "fs";
import path from "path";
import util from "util";

const readFile = util.promisify(fs.readFile);
const stat = util.promisify(fs.stat);

const read = async () => {
  const dir = "./src/fs/files";
  const filePath = path.join(dir, "fileToRead.txt");

  try {
    // Проверяем, существует ли файл
    await stat(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed: fileToRead.txt does not exist");
    }
    throw err;
  }

  // Читаем и печатаем содержимое файла
  const content = await readFile(filePath, "utf8");
  console.log("Content of fileToRead.txt:");
  console.log(content);
};

read().catch((err) => console.error(err.message));
