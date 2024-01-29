import fs from "fs";
import crypto from "crypto";
import path from "path";
import { promisify } from "util";

const calculateHash = async () => {
  const __dirname = "./src/hash/files";

  const filePath = path.join(__dirname, "fileToCalculateHashFor.txt");
  const hash = crypto.createHash("sha256");

  const readFile = promisify(fs.readFile);
  try {
    const data = await readFile(filePath);
    hash.update(data);
    const hex = hash.digest("hex");
    console.log(`SHA256 hash of fileToCalculateHashFor.txt: ${hex}`);
    return hex;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
};

await calculateHash();
