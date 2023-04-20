import jwt from "jsonwebtoken";

import { User } from "../entities";
import { DataStoredInToken, Token } from "../interfaces";

export const generateToken = (user: User): Token => {
  const dataStoredInToken: DataStoredInToken = {
    id: user.id,
  };
  const secretKey: string = process.env.SECRET_KEY || "secret";
  const expiresIn: number = 60 * 60;

  return {
    user,
    token: jwt.sign(dataStoredInToken, secretKey, {
      expiresIn,
    }),
    expiresIn,
  };
};

export const verifyToken = (
  token: string,
  secrect: string
): DataStoredInToken => {
  return jwt.verify(token, secrect) as DataStoredInToken;
};
