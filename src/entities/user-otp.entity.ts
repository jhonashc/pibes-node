import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity("user_otp")
export class UserOtp extends Base {
  @Column({
    type: "text",
  })
  code: string;

  @Column({
    type: "timestamp",
    name: "expiration_date",
  })
  expirationDate: Date;

  /* Relations */
  @OneToOne(() => User, (user) => user.otp, {
    nullable: false,
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;
}
