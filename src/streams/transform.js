import { Transform } from "stream";

const transform = async () => {
  // Create a Transform stream that reverses the input text
  const reverseTransform = new Transform({
    transform(chunk, callback) {
      // Reverse the text and push it to the output stream
      const reversedChunk = chunk.toString().split("").reverse().join("");
      this.push(reversedChunk);
      callback();
    },
  });

  // Listen for 'data' event on the Transform stream
  reverseTransform.on("data", (chunk) => {
    // Write the reversed data chunk to process.stdout
    process.stdout.write(chunk);
  });

  // Listen for 'end' event on the Transform stream
  reverseTransform.on("end", () => {
    console.log("\nTransform stream has ended.");
  });

  // Listen for 'error' event on the Transform stream
  reverseTransform.on("error", (error) => {
    console.error("Error during transformation:", error);
  });

  // Pipe process.stdin to the Transform stream
  process.stdin.pipe(reverseTransform);
};

// Call the transform function
await transform();
