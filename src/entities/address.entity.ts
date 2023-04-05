import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity("address")
export class Address extends Base {
  @Column({
    type: "text",
    name: "address_line1",
  })
  addressLine1: string;

  @Column({
    type: "text",
    name: "address_line2",
  })
  addressLine2: string;

  @Column({
    type: "text",
    name: "address_reference",
  })
  addressReference: string;

  /* Relations */
  @ManyToOne(() => User, (user) => user.addresses, {
    nullable: false,
  })
  @JoinColumn({ name: "user_id" })
  user: User;
}
