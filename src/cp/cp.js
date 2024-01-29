import { spawn } from "child_process";

const spawnChildProcess = async (args) => {
  const childProcess = spawn("node", ["./src/cp/files/script.js", ...args], {
    stdio: [process.stdin, process.stdout, process.stderr, "pipe"],
  });

  // Обработка ошибок дочернего процесса
  childProcess.on("error", (error) => {
    console.error(`Child process error: ${error.message}`);
  });

  // Обработка завершения дочернего процесса
  childProcess.on("close", (code) => {
    console.log(`Child process exited with code ${code}`);
  });

  // Возвращаем дочерний процесс, чтобы иметь возможность взаимодействовать с ним, если нужно
  return childProcess;
};
spawnChildProcess(["arg1", "arg2", "arg3"]);
