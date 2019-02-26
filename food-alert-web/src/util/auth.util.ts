const TOKEN_KEY = 'token';

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  return localStorage.setItem(TOKEN_KEY, token);
};
