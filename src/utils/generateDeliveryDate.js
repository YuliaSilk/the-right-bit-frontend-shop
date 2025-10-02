/**
  @param {number} days 
  @returns {Date} 
 */
export function generateDeliveryDate(days) {
 const today = new Date();
 today.setDate(today.getDate() + days);
 return today;
}

function formatDeliveryDate(date) {
 const options = {
  month: "long",
  day: "numeric",
 };

 return date.toLocaleDateString("en-US", options);
}

/**
 * Генерує рядок діапазону доставки (наприклад, "June 19 - 21").
 * @param {number} minDays
 * @param {number} maxDays
 * @returns {string}
 */
export function getDeliveryRangeString(minDays, maxDays) {
 const minDate = generateDeliveryDate(minDays);
 const maxDate = generateDeliveryDate(maxDays);

 const minMonth = minDate.toLocaleDateString("en-US", {month: "long"});
 const minDay = minDate.getDate();
 const maxDayNum = maxDate.getDate();

 if (minDate.getMonth() === maxDate.getMonth()) {
  return `${minMonth} ${minDay} - ${maxDayNum}`;
 } else {
  const maxFormatted = formatDeliveryDate(maxDate);
  return `${minMonth} ${minDay} - ${maxFormatted}`;
 }
}
