import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { Base } from "./base.entity";
import { Gender } from "./gender.entity";
import { User } from "./user.entity";

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

  /* Relations */
  @ManyToOne(() => Gender, (gender) => gender.people, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({
    name: "gender_id",
  })
  gender?: Gender;

  @OneToOne(() => User, (user) => user.person)
  user: User;
}
