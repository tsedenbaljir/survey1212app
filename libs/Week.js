import moment from 'moment';

export function Week(startingDate) {
  const week = [
    { date: moment(startingDate).format("MM/DD"), day: moment(startingDate).day() },
    { date: moment(startingDate).add(1, "day").format("MM/DD"), day: moment(startingDate).add(1, "day").day() },
    { date: moment(startingDate).add(2, "day").format("MM/DD"), day: moment(startingDate).add(2, "day").day() },
    { date: moment(startingDate).add(3, "day").format("MM/DD"), day: moment(startingDate).add(3, "day").day() },
    { date: moment(startingDate).add(4, "day").format("MM/DD"), day: moment(startingDate).add(4, "day").day() },
    { date: moment(startingDate).add(5, "day").format("MM/DD"), day: moment(startingDate).add(5, "day").day() },
    { date: moment(startingDate).add(6, "day").format("MM/DD"), day: moment(startingDate).add(6, "day").day() }
  ];
  console.log(week);
  console.log(startingDate);
  return week
}

export const WeekName = (days) => {
  let id = days == 0 ? 7 : days
  switch (id) {
      case 1:
          return "Даваа";
      case 2:
          return "Мягмар";
      case 3:
          return "Лхагва";
      case 4:
          return "Пүрэв";
      case 5:
          return "Баасан";
      case 6:
          return "Бямба";
      default:
          return "Ням";
  }
};
