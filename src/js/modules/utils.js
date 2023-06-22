const addZero = (n) => n < 10 ? `0${n}` : n;

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

  const dayOfMonth = addZero(date.getDate())
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  const dayOfMWeek = weekDays[date.getDay()]

  const hours = addZero(date.getHours())
  const minutes = addZero(date.getMinutes())

  return {dayOfMonth, month, year, hours, minutes, dayOfMWeek}
}

export const getWindDirectionSymbol = (deg) => {
  let windDirection = ''
  if (deg >= 337.5 || deg < 22.5) {
    windDirection = '↓ С';
  } else if (deg >= 22.5 && deg < 67.5) {
    windDirection = '↙ СЗ';
  } else if (deg >= 67.5 && deg < 112.5) {
    windDirection = '← З';
  } else if (deg >= 112.5 && deg < 157.5) {
    windDirection = '↖ СВ';
  } else if (deg >= 157.5 && deg < 202.5) {
    windDirection = '↑ Ю';
  } else if (deg >= 202.5 && deg < 247.5) {
    windDirection = '↗ ЮВ';
  } else if (deg >= 247.5 && deg < 292.5) {
    windDirection = '→ В';
  } else {
    windDirection = '↘ ЮЗ';
  }
  return windDirection
}

export const calculateDewPoint = (temperature, humidity) => {
  temperature = temperature - 273.15
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return dewPoint.toFixed(1);
}