// main.js (updated with logging)
import { Worker } from "worker_threads";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// Get the current module's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const numCores = os.cpus().length;
  const workers = [];
  const results = new Array(numCores).fill(null); // Initialize results array

  for (let i = 0; i < numCores; i++) {
    // Construct the absolute path to the worker script
    const workerPath = path.resolve(__dirname, "worker.js");
    const worker = new Worker(workerPath, { workerData: { n: 10 + i } });
    workers.push(worker);

    console.log(`Worker ${i} started.`);

    worker.on("message", (message) => {
      results[i] = message;
    });

    worker.on("error", (error) => {
      console.error(`Worker ${i} error:`, error);
      results[i] = { status: "error", data: error.message };
    });

    worker.on("exit", (code) => {
      console.log(`Worker ${i} finished.`);
      if (code !== 0) {
        console.error(`Worker ${i} stopped with exit code ${code}`);
      }
    });
  }

  // Wait for all workers to exit
  await Promise.all(
    workers.map(
      (worker) => new Promise((resolve) => worker.once("exit", resolve))
    )
  );

  // Output the results to the console
  console.log(results);
};

performCalculations().catch((error) => {
  console.error("An error occurred:", error);
});
