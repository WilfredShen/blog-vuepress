const weekdays = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

const currentTime = ({ dateSeparator = "-", timeSeparator = ":", datetimeSeparator = " " } = {}) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");
  const second = now.getSeconds().toString().padStart(2, "0");
  const weekday = now.getDay();
  const date = `${year}${dateSeparator}${month}${dateSeparator}${day}`;
  const time = `${hour}${timeSeparator}${minute}${timeSeparator}${second}`;
  const datetime = `${date}${datetimeSeparator}${time}`;
  return {
    date,
    time,
    datetime,
    weekday: weekdays[weekday],
    data: { now, year, month, day, hour, minute, second, weekday },
  };
};

module.exports = {
  currentTime,
};
