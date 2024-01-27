export default function convertToISODate(inputDate) {
  // Split the input string into date and time parts
  const [datePart, timePart] = inputDate.split(' ');

  // Split the date part into day, month, and year
  const [day, month, year] = datePart.split('-');

  // Split the time part into hours, minutes, and period (AM/PM)
  const [time, period] = timePart.split(' ');

  // Split the hours and minutes
  const [hours, minutes] = time.split(':');

  // Adjust hours for AM/PM
  const adjustedHours =
    period === 'PM' ? parseInt(hours, 10) + 12 : parseInt(hours, 10);

  // Create a new Date object using the parsed values
  const isoDate = new Date(
    `${year}-${month}-${day}T${adjustedHours}:${minutes}:00`
  );

  return isoDate.toISOString();
}
