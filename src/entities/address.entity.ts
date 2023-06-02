import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity("address")
export class Address extends Base {
  @Column({
    type: "text",
  })
  name: string;

  @Column({
    type: "text",
    name: "side_street",
  })
  sideStreet: string;

  @Column({
    type: "text",
    name: "delivery_instruction",
  })
  deliveryInstruction: string;

  /* Relations */
  @ManyToOne(() => User, (user) => user.addresses, {
    nullable: false,
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;
}
