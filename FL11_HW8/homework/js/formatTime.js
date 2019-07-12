function formatTime(numberOfMinutes) {
    const hoursInDay = 24,
          minutesInHour = 60;
    let days = numberOfMinutes / hoursInDay / minutesInHour ^ 0;
    let minutes = numberOfMinutes % minutesInHour;
    let hours = (numberOfMinutes - minutes) / minutesInHour % hoursInDay;
    return `${days} day(s) ${hours} hour(s) ${minutes} minute(s)`;
}
console.log(formatTime(120));
console.log(formatTime(59));
console.log(formatTime(1441));