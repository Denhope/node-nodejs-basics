import fs from "fs";
import path from "path";
import util from "util";

const copyDir = util.promisify(fs.copyFile);
const mkdir = util.promisify(fs.mkdir);
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const copy = async () => {
  const sourceDir = "./src/fs/files";
  const destDir = "./src/fs/files_copy";

  try {
    // Проверяем, существует ли исходная папка
    await stat(sourceDir);

    // Проверяем, существует ли папка назначения
    try {
      await stat(destDir);
      throw new Error("FS operation failed: files_copy already exists");
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    // Создаем папку назначения
    await mkdir(destDir);

    // Копируем файлы из исходной папки в папку назначения
    const files = await readdir(sourceDir);
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      await copyDir(sourcePath, destPath);
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed: files does not exist");
    }
    throw err;
  }
};

copy().catch((err) => console.error(err.message));
