import { Days } from "../entities";

export const getCurrentDay = (): Days => {
  const date: Date = new Date();
  const dayInNumber: number = date.getDay();
  return Object.keys(Days)[dayInNumber - 1] as Days;
};
