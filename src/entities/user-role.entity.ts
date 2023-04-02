import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Date } from "./date.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";

@Entity("user_role")
export class UserRole extends Date {
  @PrimaryColumn({
    name: "role_id",
  })
  roleId: string;

  @PrimaryColumn({
    name: "user_id",
  })
  userId: string;

  @ManyToOne(() => Role, (role) => role.users, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "role_id",
  })
  role: Role;

  @ManyToOne(() => User, (user) => user.roles, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;
}
