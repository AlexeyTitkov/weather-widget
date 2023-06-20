export const getCurrentDateTime = () => {
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек'
  ];
  const weekDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  const date = new Date()

  let dayOfMonth = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const dayOfMWeek = weekDays[date.getDay()]

  let hours = date.getHours()
  let minutes = date.getMinutes()

  if (hours < 10) {
    hours = `0${hours}`
  }

  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  if (dayOfMonth < 10) {
    dayOfMonth = `0${dayOfMonth}`
  }

  return { dayOfMonth, month, year, hours, minutes, dayOfMWeek }
}