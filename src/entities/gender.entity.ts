import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { Person } from "./person.entity";

@Entity("gender")
export class Gender extends Base {
  @Column({
    type: "text",
    unique: true,
  })
  name: string;

  /* Relations */
  @OneToMany(() => Person, (person) => person.gender)
  people: Person[];
}
