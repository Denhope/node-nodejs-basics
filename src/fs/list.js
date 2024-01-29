import fs from "fs";
import path from "path";
import util from "util";

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const list = async () => {
  const dir = "./src/fs/files";

  try {
    // Проверяем, существует ли папка
    await stat(dir);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed: files directory does not exist");
    }
    throw err;
  }

  // Получаем список файлов в папке
  const files = await readdir(dir);

  // Печатаем список файлов
  console.log("Files in the directory:");
  files.forEach((file) => {
    console.log(file);
  });
};

list().catch((err) => console.error(err.message));
