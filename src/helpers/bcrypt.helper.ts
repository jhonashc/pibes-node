import bcrypt from "bcrypt";

export const encryptPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePasswords = (
  password: string,
  receivedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, receivedPassword);
};
