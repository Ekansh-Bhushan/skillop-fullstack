function convertToNormalTime(time) {
    time = time.toString();

    if (time.length === 3 || time.length === 4) {
        if (time.length === 3) {
            // If the input has 3 characters, prepend a '0' for hours.
            time = "0" + time;
        }

        const hours = time.slice(0, 2);
        const minutes = time.slice(2);

        const isPM = parseInt(hours) >= 12;
        const suffix = isPM ? "PM" : "AM";

        // Convert hours to 12-hour format
        const normalizedHours = isPM
            ? parseInt(hours) === 12
                ? 12
                : parseInt(hours) - 12
            : hours;

        return `${normalizedHours}:${minutes} ${suffix}`;
    } else {
        return "Invalid input";
    }
}


export default convertToNormalTime;
