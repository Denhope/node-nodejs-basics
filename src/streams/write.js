import fs from "fs";
import path from "path";
import { promisify } from "util";

const mkdir = promisify(fs.mkdir);

const write = async () => {
  const __dirname = "./src/streams/files"; // Assuming this is the relative path to the directory
  const filePath = path.join(__dirname, "fileToWrite.txt");

  // Create the directory if it doesn't exist
  try {
    await mkdir(path.dirname(filePath), { recursive: true });
  } catch (error) {
    console.error("Error creating directory:", error);
    return;
  }

  // Create a writable stream
  const writableStream = fs.createWriteStream(filePath);

  // Listen for 'data' event on process.stdin
  process.stdin.on("data", (chunk) => {
    console.log("Received data chunk of size:", chunk.length);
    // Write the data chunk to the file
    writableStream.write(chunk);
  });

  // Listen for 'end' event on process.stdin
  process.stdin.on("end", () => {
    console.log("End of input stream.");
    // End the writable stream
    writableStream.end();
  });

  // Listen for 'error' event on writable stream
  writableStream.on("error", (error) => {
    console.error("Error writing to file:", error);
  });

  // Listen for 'finish' event on writable stream
  writableStream.on("finish", () => {
    console.log("Data has been written to file.");
  });
};

// Call the write function
write().catch((error) => {
  console.error("An error occurred:", error);
});
