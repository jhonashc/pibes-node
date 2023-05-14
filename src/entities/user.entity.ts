import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { encryptPassword } from "../helpers";

import { Address } from "./address.entity";
import { Base } from "./base.entity";
import { FavoriteProduct } from "./favorite-product.entity";
import { Order } from "./order.entity";
import { Person } from "./person.entity";
import { UserOtp } from "./user-otp.entity";

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
    unique: true,
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

  @Column({
    type: "boolean",
    default: false,
    name: "is_active",
  })
  isActive: boolean;

  /* Relations */
  @OneToOne(() => Person, (person) => person.user, {
    eager: true,
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "person_id",
  })
  person?: Person;

  @OneToOne(() => UserOtp, (userOpt) => userOpt.user, {
    eager: true,
    cascade: true,
  })
  otp: UserOtp;

  @OneToMany(() => Address, (address) => address.user)
  addresses?: Address[];

  @OneToMany(() => Order, (order) => order.user)
  orders?: Order[];

  @OneToMany(() => FavoriteProduct, (favoriteProduct) => favoriteProduct.user)
  favoriteProducts?: FavoriteProduct[];

  /* Listeners */
  @BeforeInsert()
  async hashPassword() {
    this.password = await encryptPassword(this.password);
  }
}
