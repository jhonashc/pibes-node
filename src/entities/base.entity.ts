import { PrimaryGeneratedColumn } from "typeorm";

import { Date } from "./date.entity";

export abstract class Base extends Date {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
