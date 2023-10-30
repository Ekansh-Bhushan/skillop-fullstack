exports.calculateTimeGap = (time1, time2) => {
    time1 = time1.toString().padStart(4, "0");
    time2 = time2.toString().padStart(4, "0");

    if (time1.length !== 4 || time2.length !== 4) {
        return "Invalid input";
    }

    const hours1 = parseInt(time1.slice(0, 2));
    const minutes1 = parseInt(time1.slice(2));
    const hours2 = parseInt(time2.slice(0, 2));
    const minutes2 = parseInt(time2.slice(2));

    // Calculate the time difference in minutes
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;
    const timeDifferenceInMinutes = Math.abs(totalMinutes2 - totalMinutes1);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(timeDifferenceInMinutes / 60);
    const minutes = timeDifferenceInMinutes % 60;
    const seconds = 0; // Assuming seconds are always zero for this format
    if (!seconds && !minutes) return `${hours} hr`;
    if (!seconds) return `${hours} hr ${minutes} min`;

    return `${hours} hr ${minutes} min ${seconds} sec`;
}

// Example usage:
const time1 = 700;
const time2 = 1600;

const timeGap = calculateTimeGap(time1, time2);

console.log(
    `Time Gap: ${timeGap.hours} hours, ${timeGap.minutes} minutes, ${timeGap.seconds} seconds`
);

export default calculateTimeGap;
