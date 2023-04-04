import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

import { Base } from "./base.entity";
import { Person } from "./person.entity";

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

  /* Relations */
  @OneToOne(() => Person, (person) => person.user, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: "person_id" })
  person: Person;

  @Column({
    type: "text",
    array: true,
    default: ["user"],
  })
  roles: string[];
}
