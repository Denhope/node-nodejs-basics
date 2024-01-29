import zlib from "zlib";
import fs from "fs";
import path from "path";

const decompress = async () => {
  const __dirname = "./src/zip/files";
  const archivePath = path.join(__dirname, "archive.gz");
  const outputPath = path.join(__dirname, "fileToCompress.txt");

  return new Promise((resolve, reject) => {
    const gunzip = zlib.createGunzip();
    const source = fs.createReadStream(archivePath);
    const destination = fs.createWriteStream(outputPath);

    source.on("error", (err) => {
      reject(err);
    });

    gunzip.on("error", (err) => {
      reject(err);
    });

    destination.on("error", (err) => {
      reject(err);
    });

    destination.on("finish", () => {
      console.log("File has been decompressed successfully.");
      resolve();
    });

    source.pipe(gunzip).pipe(destination);
  });
};

await decompress();
