import { DayOfWeek } from "../entities";

const date = new Date();

export const getPromotionDay = (): DayOfWeek => {
  const currentDay = date.getDay() - 1;
  const weekDays = Object.values(DayOfWeek);
  return weekDays[currentDay] || DayOfWeek.SUNDAY;
};
