import { DayOfWeek } from "../entities";

const date = new Date();

export const getPromotionDay = (): DayOfWeek => {
  const currentDay = date.getDay() - 1;
  return Object.values(DayOfWeek)[currentDay] || DayOfWeek.SUNDAY;
};
