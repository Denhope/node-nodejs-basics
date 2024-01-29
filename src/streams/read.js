import fs from "fs";
import path from "path";

const read = async () => {
  const __dirname = "./src/streams/files";
  const filePath = path.join(__dirname, "fileToRead.txt");

  // Create a readable stream
  const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });

  // Listen for 'data' event on the readable stream
  readableStream.on("data", (chunk) => {
    // Write the data chunk to process.stdout
    process.stdout.write(chunk);
  });

  // Listen for 'end' event on the readable stream
  readableStream.on("end", () => {
    console.log("\nRead stream has ended.");
  });

  // Listen for 'error' event on the readable stream
  readableStream.on("error", (error) => {
    console.error("Error reading file:", error);
  });
};

// Call the read function
await read();
