import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import { readFile } from "fs/promises";
import "./files/c.js";

const random = Math.random();

let unknownObject;

const readJsonFile = async (filePath) => {
  const fileContent = await readFile(filePath, "utf-8");
  return JSON.parse(fileContent);
};

if (random > 0.5) {
  unknownObject = readJsonFile("./src/modules/files/a.json");
} else {
  unknownObject = readJsonFile("./src/modules/files/b.json");
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${path.resolve(import.meta.url)}`);
console.log(
  `Path to current directory is ${path.dirname(path.resolve(import.meta.url))}`
);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

unknownObject.then((obj) => console.log(obj));

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };