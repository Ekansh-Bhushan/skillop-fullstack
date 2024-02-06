const isValidAvailability = (availability) => {
    availability = availability.sort((a, b) => {
        if (a.s == b.s) {
            return a.e - b.e;
        }
        return a.s - b.s;
    });
    for (let i = 0; i < availability.length; i++) {
        if (availability[i].s >= availability[i].e) {
            console.log("start > end")
            return false;
        }
    }
    for (let i = 0; i < availability.length - 1; i++) {
        if (availability[i].e > availability[i + 1].s) {
            return false;
        }
    }
    return availability;
};

module.exports = isValidAvailability;
