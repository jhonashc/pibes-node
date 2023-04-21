import { Column, Entity, OneToOne } from "typeorm";

import { Base } from "./base.entity";
import { User } from "./user.entity";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNDEFINED = "UNDEFINED",
}

@Entity("person")
export class Person extends Base {
  @Column({
    type: "text",
    nullable: true,
    name: "first_name",
  })
  firstName?: string;

  @Column({
    type: "text",
    nullable: true,
    name: "last_name",
  })
  lastName?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  telephone?: string;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.UNDEFINED,
  })
  gender: Gender;

  @OneToOne(() => User, (user) => user.person)
  user: User;
}
