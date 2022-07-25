const envKeysToCheck = ["DB_HOST", "DB_USER", "DB_NAME", "PORT", "JWT_SECRET_TOKEN"];

envKeysToCheck.map((key) => {
  if (!process.env[key]) throw new Error("No ENV present for " + key);
});
