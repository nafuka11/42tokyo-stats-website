export const getEnv = (envName: string): string => {
  const envVar = process.env[envName];
  if (!envVar) {
    throw new Error(`process.env.${envName} is undefined or empty`);
  }
  return envVar;
};
