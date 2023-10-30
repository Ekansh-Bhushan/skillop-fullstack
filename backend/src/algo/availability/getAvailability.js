const getAvailability = (order, availability) => {
    // console.log("order", order, "availability", availability)
    const newAvailability = [];
    let i = 0,
        j = 0;

    while (i < availability.length && j < order.length) {
        const o = order[j],
            a = availability[i];
        if (order[j].e <= availability[i].e) {
            if (order[j].s < availability[i].s) {
                console.log(
                    order[j],
                    " Invalid order 💩 | Order start before the mentor is available"
                );
                j++;
            } else {
                if (o.s == a.s) {
                    if (o.e == a.e) {
                        i++;
                    } else {
                        availability[i].s = o.e;
                    }
                } else {
                    if (o.e == a.e) {
                        newAvailability.push({ s: a.s, e: o.s });
                        i++;
                    } else {
                        newAvailability.push({ s: a.s, e: o.s });
                        availability[i].s = o.e;
                    }
                }
                j++;
            }
        } else {
            if (o.s < a.e) {
                console.log(
                    o,
                    " Invalid order💩 | Order takes mentors non avaibility time!"
                );
                j++;
            } else {
                newAvailability.push(a);
                i++;
            }
        }
        // console.log("i", i, "j", j, "newAvailability", newAvailability);
    }
    // console.log(order.length, j, "💩 invalid data")
    while (j < order.length) {
        console.log("💩 invalid data");
    }
    while (i < availability.length) {
        newAvailability.push(availability[i]);
        i += 1;
    }
    return newAvailability;
};
module.exports = getAvailability;

if (require.main === module) {
    const availability = [
        { s: 700, e: 900 },
        { s: 1000, e: 1100 },
        { s: 2200, e: 2300 }
    ];

    const order = [
        { s: 1000, e: 1001 },
    ];

    console.log(getAvailability(order, availability));
}
