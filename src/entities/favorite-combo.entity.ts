import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Date } from "./date.entity";
import { Combo } from "./combo.entity";
import { User } from "./user.entity";

@Entity("favorite_combo")
export class FavoriteCombo extends Date {
  @PrimaryColumn({
    name: "combo_id",
  })
  comboId: string;

  @PrimaryColumn({
    name: "user_id",
  })
  userId: string;

  @ManyToOne(() => Combo, (combo) => combo.users, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "combo_id",
  })
  combo: Combo;

  @ManyToOne(() => User, (user) => user.favoriteCombos, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;
}
