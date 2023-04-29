import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Category } from "./category.entity";
import { Combo } from "./combo.entity";
import { Date } from "./date.entity";

@Entity("combo_category")
export class ComboCategory extends Date {
  @PrimaryColumn({
    name: "category_id",
  })
  categoryId: string;

  @PrimaryColumn({
    name: "combo_id",
  })
  comboId: string;

  @ManyToOne(() => Category, (category) => category.combos, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "category_id",
  })
  category: Category;

  @ManyToOne(() => Combo, (combo) => combo.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "combo_id",
  })
  combo: Combo;
}
