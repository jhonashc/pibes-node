import { User } from "../entities";

export interface DataStoredInToken {
  id: string;
}

export interface Token {
  user: User;
  token: string;
  expiresIn: number;
}
