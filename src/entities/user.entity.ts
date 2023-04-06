import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Address } from "./address.entity";
import { Base } from "./base.entity";
import { Person } from "./person.entity";
import { encryptPassword } from "../helpers";

export enum Roles {
  USER = "USER",
  ADVANCED = "ADVANCED",
  USERADMIN = "USERADMIN",
  ADMIN = "ADMIN",
}

@Entity("user")
export class User extends Base {
  @Column({
    type: "text",
  })
  username: string;

  @Column({
    type: "text",
    unique: true,
  })
  email: string;

  @Column({
    type: "text",
  })
  password: string;

  @Column({
    type: "text",
    nullable: true,
    name: "avatar_url",
  })
  avatarUrl?: string;

  @Column({
    type: "enum",
    enum: Roles,
    array: true,
    default: [Roles.USER],
  })
  roles: Roles[];

  /* Relations */
  @OneToOne(() => Person, (person) => person.user, {
    eager: true,
    cascade: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "person_id" })
  person: Person;

  @OneToMany(() => Address, (address) => address.user)
  addresses?: Address[];

  /* Listeners */
  @BeforeInsert()
  async hashPassword() {
    this.password = await encryptPassword(this.password);
  }
}
