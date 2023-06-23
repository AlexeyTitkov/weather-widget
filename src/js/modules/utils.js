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
  const directions = ['↓ С', '↙ СВ', '← В', '↖ ЮВ', '↑ Ю', '↗ ЮЗ', '→ З', '↘ СЗ'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export const calculateDewPoint = (temperature, humidity) => {
  temperature = temperature - 273.15
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return dewPoint.toFixed(1);
}

export const getWeatherForecastData = (data) => {

  const forecast = data.list.filter((item) =>
    new Date(item.dt_txt).getHours() === 12 &&
    new Date(item.dt_txt).getDate() > new Date().getDate() &&
    new Date(item.dt_txt).getDate() < new Date().getDate() + 5
  );

  const forecastData = forecast.map((item) => {

    const date = new Date(item.dt_txt)


    const weekDaysShort = [
      'вc',
      'пн',
      'вт',
      'ср',
      'чт',
      'пт',
      'сб',
    ];

    const dayOfWeek = weekDaysShort[date.getDay()];

    const weatherIcon = item.weather[0].icon;

    let minTemp = Infinity;
    let maxTemp = -Infinity;

    for (let i = 0; i < data.list.length; i++) {
      const temp = data.list[i].main.temp;
      const tempDate = new Date(data.list[i].dt_txt)

      if (tempDate.getDate() === date.getDate()) {
        if (temp < minTemp) {
          minTemp = temp;
        }

        if (temp > maxTemp){
          maxTemp = temp;
        }
      }
    }

    return {
      dayOfWeek,
      weatherIcon,
      minTemp,
      maxTemp,
    }

  })

  return forecastData;

}