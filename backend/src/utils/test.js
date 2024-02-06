const isValidAvailability = require('../algo/availability/isValidAvailability');
const slotsDivider = require('../algo/availability/slotsHourDivider');

const updateAvailability = async (req) => {
  try {
    // check is availability is valid
    const availability = req.body.actualAvailability;
    let flag = true;
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    for (let i = 0; i < days.length; i++) {
      if (!availability[days[i]]) {
        continue;
      }
      availability[days[i]] = isValidAvailability(availability[days[i]]);
      if (availability[days[i]]) {
        availability[days[i]] = slotsDivider(availability[days[i]]);
        availability[days[i]] = availability[days[i]].sort((a, b) => {
          if (a.s == b.s) {
            return a.e - b.e;
          }
          return a.s - b.s;
        });
      }
      if (!availability[days[i]]) {
        flag = false;
        break;
      }
    }
    if (!flag) {
      console.log('Please provide valid availibility');
      return;
    }
    console.log("here is final - ",availability)
  } catch (error) {
    console.log('Unable to add slot ', error);
  }
};

const req = {
  body: {
    actualAvailability: {
      monday: [{ s: '1100', e: '1900' }],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
  },
};

updateAvailability(req);

// console.log(slotsDivider([{ s: '1100', e: '1900' }]));
