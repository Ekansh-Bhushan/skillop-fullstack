const slotsDivider = (slots) => {
  let newSlots = [];
  slots.forEach((item) => {
    if (item.e - item.s > 100) {
      for (let i = item.s; i < item.e; i += 100) {
        newSlots.push({ s: i, e: i + 100 });
      }
    } else {
      newSlots.push(item);
    }
  });
  return newSlots;
};

let slots = [
  {
    s: 1900,
    e: 2000,
  },
  {
    s: 1100,
    e: 1600,
  },
  {
    s: 800,
    e: 900,
  },
];

const dividedslots = slotsDivider(slots);
console.log('final ', dividedslots);
