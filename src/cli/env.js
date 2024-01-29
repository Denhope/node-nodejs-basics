const parseEnv = () => {
  // Get all environment variables
  const envVars = process.env;

  // Filter and format environment variables
  const rssVars = Object.keys(envVars)
    .filter((key) => key.startsWith("RSS_"))
    .map((key) => `${key}=${envVars[key]}`)
    .join("; ");

  // Print the result
  console.log(rssVars);
};

parseEnv();
