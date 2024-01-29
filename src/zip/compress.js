import zlib from "zlib";
import fs from "fs";
import path from "path";

const compress = async () => {
  const __dirname = "./src/zip/files";
  const filePath = path.join(__dirname, "fileToCompress.txt");
  const outputPath = path.join(__dirname, "archive.gz");

  return new Promise((resolve, reject) => {
    const gzip = zlib.createGzip();
    const source = fs.createReadStream(filePath);
    const destination = fs.createWriteStream(outputPath);

    source.on("error", (err) => {
      reject(err);
    });

    gzip.on("error", (err) => {
      reject(err);
    });

    destination.on("error", (err) => {
      reject(err);
    });

    destination.on("finish", () => {
      console.log("File has been compressed successfully.");
      resolve();
    });

    source.pipe(gzip).pipe(destination);
  });
};

await compress();
