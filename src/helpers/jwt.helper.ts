import jwt from "jsonwebtoken";

import { User } from "../entities";
import { Payload, Token } from "../interfaces";

export const generateTokens = (user: User): Token => {
  const payload: Payload = {
    userId: user.id,
  };

  const accessToken: string = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_PRIVATE_KEY || "ACCESS_TOKEN_PRIVATE_KEY",
    { expiresIn: "15m" }
  );

  const refreshToken: string = jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_PRIVATE_KEY || "REFRESH_TOKEN_PRIVATE_KEY",
    { expiresIn: "30d" }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (token: string, secrect: string): Payload => {
  return jwt.verify(token, secrect) as Payload;
};
