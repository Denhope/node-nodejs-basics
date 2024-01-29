// worker.js
import { parentPort, workerData } from "worker_threads";

// Function to calculate the nth Fibonacci number
const nthFibonacci = (n) => {
  if (n < 2) {
    return n;
  }
  return nthFibonacci(n - 1) + nthFibonacci(n - 2);
};

// Function to send the result back to the main thread
const sendResult = (status, data) => {
  parentPort.postMessage({ status, data });
};

// Listen for messages from the parent thread
parentPort.on("message", (message) => {
  try {
    // Perform the calculation
    const result = nthFibonacci(message.n);
    // Send the result back to the parent thread
    sendResult("resolved", result);
  } catch (error) {
    // Send an error message back to the parent thread if an error occurs
    sendResult("error", null);
  }
});

// Send a ready message to the parent thread
sendResult();
