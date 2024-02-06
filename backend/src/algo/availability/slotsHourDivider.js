const slotsDivider = (slots) => {
  let newSlots = [];
  slots.forEach((item) => {
    if (Number.parseInt(item.e) - Number.parseInt(item.s) > 100) {
      for (
        let i = Number.parseInt(item.s);
        i < Number.parseInt(item.e);
        i += 100
      ) {
        newSlots.push({ s: i, e: (i + 100 <= item.e) ? i + 100 : i + 30 });
      }
    } else {
      newSlots.push(item);
    }
  });
  return newSlots;
};

module.exports = slotsDivider;

// let slots = [
//   {
//     s: 1900,
//     e: 2000,
//   },
//   {
//     s: 1100,
//     e: 1600,
//   },
//   {
//     s: 800,
//     e: 900,
//   },
// ];

// const dividedslots = slotsDivider(slots);
// console.log('final ', dividedslots);
