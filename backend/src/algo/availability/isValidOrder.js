const isValidOrder = (order, availability) => {
    let hi = availability.length - 1;
    let lo = 0;
    while (hi - lo > 1) {
        let mid = Math.floor((hi + lo) / 2);
        // console.log(availability[mid], mid)
        if (availability[mid].e < order.e) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    let i = null;
    if (availability[lo].e >= order.e) {
        i = lo;
    } else {
        i = hi;
    }
    // console.log(i, availability[i])
    if(availability[i].s <= order.s && availability[i].e >= order.e) {
        return [availability[i], i];
    } else {
        return false;
    }
};

module.exports = isValidOrder;

if (require.main === module) {
    const availability = [
        {
            s: 1,
            e: 5,
        },
        {
            s: 7,
            e: 10,
        },
    ];
    const order = {
        s: 1,
        e: 6,
    };
    console.log(isValidOrder(order, availability));
}
