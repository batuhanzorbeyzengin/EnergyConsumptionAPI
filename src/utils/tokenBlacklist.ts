const tokenBlacklist = new Set<string>();

export const addToBlacklist = (token: string) => {
  tokenBlacklist.add(token);
};

export const isTokenBlacklisted = (token: string) => {
  return tokenBlacklist.has(token);
};