import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { UserRole } from "./user-role.entity";

@Entity("role")
export class Role extends Base {
  @Column({
    type: "text",
    unique: true,
  })
  name: string;

  /* Relations */
  @OneToMany(() => UserRole, (userRole) => userRole.role, {
    cascade: true,
  })
  users: UserRole[];
}
