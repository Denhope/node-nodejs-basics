const parseArgs = () => {
  // Get the command line arguments, excluding the first element (node) and the second (script file)
  const args = process.argv.slice(2);

  // Check that the number of arguments is even (each argument must have a --propName value pair)
  if (args.length % 2 !== 0) {
    console.error("Invalid arguments. Each property should have a value.");
    return;
  }

  // Format and print arguments
  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].replace(/^--/, ""); // Remove '--' from property name
    const value = args[i + 1];
    console.log(`${propName} is ${value}`);
  }
};

parseArgs();
