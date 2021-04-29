const getRelativeTime = (previous: number): string => {
  const current = new Date(Date.now()).getTime();
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return 'a few seconds ago';
  } else if (elapsed < msPerHour) {
    const minutesCalc = Math.round(elapsed / msPerMinute);
    const minuteOrMinutes = minutesCalc === 1 ? 'minute' : 'minutes';
    return `${minutesCalc} ${minuteOrMinutes} ago`;
  } else if (elapsed < msPerDay) {
    const hoursCalc = Math.floor(elapsed / msPerHour);
    const hourOrHours = hoursCalc === 1 ? 'hour' : 'hours';
    return `${hoursCalc} ${hourOrHours} ago`;
  } else if (elapsed < msPerMonth) {
    const daysCalc = Math.round(elapsed / msPerDay);
    const dayOrDays = daysCalc === 1 ? 'day' : 'days';
    return `${daysCalc} ${dayOrDays} ago`;
  } else if (elapsed < msPerYear) {
    const monthsCalc = Math.round(elapsed / msPerMonth);
    const monthOrMonths = monthsCalc === 1 ? 'month' : 'months';
    return `${monthsCalc} ${monthOrMonths} ago`;
  } else {
    const yearsCalc = Math.round(elapsed / msPerYear);
    const yearOrYears = yearsCalc === 1 ? 'year' : 'years';
    return `${yearsCalc} ${yearOrYears} ago`;
  }
};

export default getRelativeTime;
