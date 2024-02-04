const User = require('../models/user');
const Mentor = require('../models/mentor');
const isValidAvailability = require('../algo/availability/isValidAvailability');
const isValidOrder = require('../algo/availability/isValidOrder');
const getAvailability = require('../algo/availability/getAvailability');
const Meet = require('../models/meet');

const { convertFromNormalTime } = require('../utils/timeConversion');
const { eligibleToBecomeMentor } = require('../validators/mentorEligibility');
const { MENTOR_STATUS } = require('../enums/mentorStatus');
const NotificationType = require('../enums/notificationType');
const Notification = require('../models/notification');
const MEET_STATUS = require('../enums/meetStatus');
const { google } = require('googleapis');
const slotsDivider = require('../algo/availability/slotsHourDivider');
const user = require('../models/user');

// const { json } = require("express");

// exports.becomeAMentor = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id);
//         // if (user.isMentor) {
//         //     return res.status(400).send({
//         //         result: false,
//         //         message: "You are already a mentor",
//         //     });
//         // }
//         console.log(req.body);
//         if (!req.body.actualAvailability) {
//             return res.status(400).send({
//                 result: false,
//                 message: "Please provide your availability",
//             });
//         }

//         // check is availability is valid
//         const availability = JSON.parse(req.body.actualAvailability);
//         console.log(availability);
//         let flag = true;
//         const days = [
//             "sunday",
//             "monday",
//             "tuesday",
//             "wednesday",
//             "thursday",
//             "friday",
//             "saturday",
//         ];
//         for (let i = 0; i < days.length; i++) {
//             if (!availability[days[i]]) {
//                 continue;
//             }
//             availability[days[i]] = isValidAvailability(availability[days[i]]);
//             if (!availability[days[i]]) {
//                 flag = false;
//                 break;
//             }
//         }
//         if (!flag) {
//             return res.status(400).send({
//                 result: false,
//                 message: "Please provide valid availability",
//             });
//         }

//         user.isMentor = true;

//         // create new Mentor
//         const mentor = new Mentor();
//         mentor.user = user._id;
//         mentor.actualAvailability = availability;
//         mentor.chargePerHour = req.body.chargePerHour | 300;

//         // const meetRequests = {};
//         // for (let i = 0; i < days.length; i++) {
//         //     meetRequests[days[i]] = [];
//         // }

//         // mentor.meetRequests = meetRequests;

//         await mentor.save();
//         user.mentor = mentor._id;
//         await user.save();

//         res.status(200).send({
//             result: mentor.actualAvailability,
//             message: "mentor availability updated",
//         });
//     } catch (error) {
//         res.status(500).send({
//             result: false,
//             err: error.message,
//             message: "Internal Server Error",
//         });
//     }
// };

exports.requestAppointment = async (req, res) => {
  try {
    let { s, e, date } = req.body;
    console.log(req.file);
    const mentorId = req.params.mentorId;
    if (!s || !e || !mentorId || !date) {
      return res.status(400).send({
        result: false,
        message: 'Please provide all the required fields',
      });
    }

    // check day is valid or not and convert it to lower case
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    // if (!days.includes(day.toLowerCase())) {
    //     return res.status(400).send({
    //         result: false,
    //         message: "Please provide valid day",
    //     });
    // }
    // day = day.toLowerCase();

    // validate date
    date = new Date(date);
    if (date.toString() === 'Invalid Date') {
      return res.status(400).send({
        result: false,
        message: 'Please provide valid date',
      });
    }

    const day = days[date.getDay()];

    date = date.toISOString().split('T')[0];
    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res.status(400).send({
        result: false,
        message: 'Mentor not found',
      });
    }
    const user = await User.findById(req.user._id);

    // Get Mentor Current Availibility of that day [START] //
    if (!mentor.currentAvailability) {
      mentor.currentAvailability = '{}';
    }
    let currentAvailability = JSON.parse(mentor.currentAvailability);
    if (!currentAvailability[date]) {
      currentAvailability[date] = mentor.actualAvailability[day];
    }
    let currentAvailabilityDay = currentAvailability[date];

    if (currentAvailabilityDay.length === 0) {
      return res.status(400).send({
        result: false,
        message: 'Mentor is not available at this time',
      });
    }

    // check if mentor is available or not
    if (!isValidOrder({ s, e }, currentAvailabilityDay)) {
      return res.status(400).send({
        result: false,
        message: 'Mentor is not available at this time',
      });
    }

    // Get mentor currentAvailability of that day [END] //

    const mentorUser = await User.findById(mentor.user);

    // check user is booking own appointment
    if (mentorUser._id.toString() === user._id.toString()) {
      return res.status(400).send({
        result: false,
        message: 'You cannot book your own appointment',
      });
    }

    //get meetLink
    const { meetLink } = req.body;

    // Meet created [START]
    const meet = new Meet({
      mentor: mentorUser._id,
      mentee: user._id,
      s,
      e,
      day,
      date,
      paymentPic:
        process.env.BASE_URL +
        '/api/public/payment/' +
        user._id +
        '/' +
        req.file.filename,
      meetLink,
    });

    // Meet created [END]

    // Getting mentor meetRequests [START]
    // if meetRequest not present
    if (!mentor.meetRequests) mentor.meetRequests = '{}';
    let meetRequest = JSON.parse(mentor.meetRequests);
    if (!meetRequest[date]) {
      meetRequest[date] = [];
    }
    let meetRequestDay = meetRequest[date];
    // Getting mentor meetRequests [END]

    // place the meet at right position on meetRequest of mentor [START]
    let i = 0;
    if (meetRequestDay.length)
      for (; i < meetRequestDay.length; i++) {
        const meetRequest = await Meet.findById(meetRequestDay[i]);
        if (meetRequest.s > s) {
          break;
        }
      }

    meetRequestDay.splice(i, 0, meet._id);

    mentor.meetRequests = JSON.stringify(meetRequest);
    // place the meet at right position on meetRequest of mentor [END]

    // save the meet to user meetScheduled [START]
    if (!user.meetScheduled) user.meetScheduled = '{}';
    let meetScheduled = JSON.parse(user.meetScheduled);
    if (!meetScheduled[date]) {
      meetScheduled[date] = [];
    }
    let meetScheduledDay = meetScheduled[date];
    meetScheduledDay.push(meet._id);
    user.meetScheduled = JSON.stringify(meetScheduled);
    // save the meet to user meetScheduled [END]

    // This will ensure meet is not automatically accepted

    // // open the meetRequestDay object to store seet details open the meet object in meetRequestDay
    // let meetRequestDayObj = [];
    // for (let i = 0; i < meetRequestDay.length; i++) {
    //     let meetId = meetRequestDay[i];
    //     if (meetId === meet._id) {
    //         meetRequestDayObj.push(meet);
    //         continue;
    //     }
    //     // console.log(meetId)
    //     const meetOther = await Meet.findById(meetId);
    //     meetRequestDayObj.push(meetOther);
    // }
    // // get mentor new availability
    // currentAvailabilityDay = getAvailability(
    //     JSON.parse(JSON.stringify(meetRequestDayObj)),
    //     JSON.parse(JSON.stringify(currentAvailabilityDay))
    // );
    // currentAvailability[date] = currentAvailabilityDay;
    // mentor.currentAvailability = JSON.stringify(currentAvailability);
    // // console.log(mentor.currentAvailability);

    const notification = await Notification.create({
      type: NotificationType.MEET_REQUESTED,
      message: `You have a new meet request from ${user.firstname} ${user.lastname}`,
      link: '/mentor/meet/pending',
    });
    mentorUser.notifications.push(notification._id);

    await meet.save();
    await mentor.save();
    await user.save();
    await mentorUser.save();

    res.status(200).send({
      result: meet,
      message: 'Appointment requested',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.acceptMeet = async (req, res) => {
  try {
    // const date = req.query.date;
    const meetId = req.params.meetId;
    if (!meetId) {
      return res.status(400).send({
        result: false,
        message: 'Please provide meetId',
      });
    }

    const meet = await Meet.findById(meetId);

    if (!meet) {
      return res.status(400).send({
        result: false,
        message: 'Meet not found',
      });
    }

    if (meet.mentor.toString() !== req.user._id.toString()) {
      return res.status(400).send({
        result: false,
        message: 'You are not authorized to accept this meet',
      });
    }

    if (meet.status !== 'pending') {
      return res.status(400).send({
        result: false,
        message: 'This meet cannot be accepted',
      });
    }

    const date = meet.date;
    const day = meet.day;
    const mentorUser = await User.findById(meet.mentor);
    const mentor = await Mentor.findById(mentorUser.mentor);

    const meetRequest = JSON.parse(mentor.meetRequests);
    const meetRequestDay = meetRequest[date];

    if (!mentor.currentAvailability) {
      mentor.currentAvailability = '{}';
    }
    let currentAvailability = JSON.parse(mentor.currentAvailability);
    if (!currentAvailability[date]) {
      currentAvailability[date] = mentor.actualAvailability[day];
    }
    let currentAvailabilityDay = currentAvailability[date];

    if (currentAvailabilityDay.length === 0) {
      return res.status(400).send({
        result: false,
        message: 'Mentor is not available at this time',
      });
    }

    // check if mentor is available or not
    if (!isValidOrder({ s: meet.s, e: meet.e }, currentAvailabilityDay)) {
      return res.status(400).send({
        result: false,
        message: 'You are not available at this time',
      });
    }
    // console.log("meet: ", meet);
    // console.log("currentAvailabilityDay: ", currentAvailabilityDay);
    // console.log("meetRequestDay = ", meetRequestDay,"\nCurrentAvailabilityDay = ", currentAvailabilityDay);
    // Update mentor meetRequest [Nothing Required] [Done]

    // Geeting all the meetRequestDay object [START]
    let meetRequestDayObj = [];
    meetRequestDayObj.push(meet);
    // console.log(meetRequestDay)
    // for (let i = 0; i < meetRequestDay.length; i++) {
    //     let meetId = meetRequestDay[i];
    //     // console.log(meetId, meet._id)
    //     if (meetId === meet._id.toString()) {

    //         continue;
    //     }
    //     // console.log(meetId)
    //     // const meetOther = await Meet.findById(meetId);
    //     // if (meetOther.status === MEET_STATUS.ACCEPTED) {
    //     //     meetRequestDayObj.push(meetOther);
    //     // }
    // }
    // Geeting all the meetRequestDay object [END]

    // Update mentor currentAvailibility
    // get mentor new availability
    // console.log("imp\nmeetRequestDayObj = ", meetRequestDayObj, "\nCurrentAvailabilityDay = ", currentAvailabilityDay, "\nendImp")
    // console.log("meetRequestDayObj = ", meetRequestDayObj);
    // return;
    currentAvailabilityDay = getAvailability(
      JSON.parse(JSON.stringify(meetRequestDayObj)),
      JSON.parse(JSON.stringify(currentAvailabilityDay))
    );
    // console.log("NewCurrentAvailibilityDay1 = ", currentAvailabilityDay)
    currentAvailability[date] = currentAvailabilityDay;
    mentor.currentAvailability = JSON.stringify(currentAvailability);
    // console.log(mentor.currentAvailability);
    // return;

    // Update user meetScheduled [Nothing Required] [Done]

    meet.status = MEET_STATUS.ACCEPTED;
    // console.log("MeetDetails = ", meet);
    // console.log("NewCurrentAvailibilityDay = ", JSON.parse(mentor.currentAvailability)[date]);
    const notification = await Notification.create({
      type: NotificationType.MEET_ACCEPTED,
      message: `Your meet with ${mentorUser.firstname} ${mentorUser.lastname} has been accepted`,
      link: '',
    });
    const menteeUser = await User.findById(meet.mentee);
    menteeUser.notifications.push(notification._id);

    // Send notification to both the party 10min before the meeet start
    // for mentor
    const notificationMentor = new Notification({
      type: NotificationType.MEET_STARTING,
      message: `Your meet with ${menteeUser.firstname} ${menteeUser.lastname} is starting in 10min`,
      link: '',
      __created: new Date(
        new Date(meet.date).getTime() +
          ((meet.s / 100) * 60 + (meet.s % 100)) * 60 * 100 -
          (process.env.DEFAULT_TIME_MEET_NOTIFICATION | 10) * 60 * 1000
      ),
    });
    notificationMentor.save();
    mentorUser.notifications.push(notificationMentor._id);
    // for mentee
    const notificationMentee = new Notification({
      type: NotificationType.MEET_STARTING,
      message: `Your meet with ${mentorUser.firstname} ${mentorUser.lastname} is starting in 10min`,
      link: '',
      __created: new Date(
        new Date(meet.date).getTime() +
          ((meet.s / 100) * 60 + (meet.s % 100)) * 60 * 100 -
          (process.env.DEFAULT_TIME_MEET_NOTIFICATION | 10) * 60 * 1000
      ),
    });
    notificationMentee.save();
    menteeUser.notifications.push(notificationMentee._id);

    await menteeUser.save();
    await meet.save();
    await mentor.save();
    await mentorUser.save();

    res.status(200).send({
      result: meet,
      message: 'Meet accepted',
    });
  } catch (error) {
    res.status(500).send({
      result: false,

      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    if (!mentorId) {
      return res.status(400).send({
        result: false,
        message: 'mentorId is required',
      });
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(400).send({
        result: false,
        message: 'Mentor not found',
      });
    }
    let { date } = req.body;
    if (!date) {
      return res.status(400).send({
        result: false,
        message: 'Date is required',
      });
    }

    // validate date
    date = new Date(date);
    // return res.send(date, date.toString(), date.getDay());
    if (date.toString() === 'Invalid Date') {
      return res.status(400).send({
        result: false,
        message: 'Please provide valid date',
      });
    }

    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const day = days[date.getDay()];
    date = date.toISOString().split('T')[0];

    // console.log(mentor);
    const chargePerHour = mentor.chargePerHour;
    if (!mentor.currentAvailability) {
      // console.log(days[date.getDay()]);
      const avail = mentor.actualAvailability[day];
      for (let i = 0; i < avail.length; i++) {
        // calculate charge based on time
        avail[i].charge = ((avail[i].e - avail[i].s) * chargePerHour) / 100;
      }
      // console.log(avail, 1000);
      return res.status(200).send({
        result: avail,
        message: 'Availability fetched1',
      });
    }
    let currentAvailability = JSON.parse(mentor.currentAvailability);
    if (!currentAvailability[date]) {
      const avail = JSON.parse(JSON.stringify(mentor.actualAvailability[day]));
      // console.log(avail, 2500)
      for (let i = 0; i < avail.length; i++) {
        // calculate charge based on time
        // console.log(avail[i], 2600)
        avail[i].charge = ((avail[i].e - avail[i].s) * chargePerHour) / 100;
        // console.log(avail[i], 2700);
      }
      // console.log(avail, 2000);

      return res.status(200).send({
        result: avail,
        message: 'Availability fetched2',
      });
    }

    const avail = currentAvailability[date];
    for (let i = 0; i < avail.length; i++) {
      avail[i].charge = ((avail[i].e - avail[i].s) * chargePerHour) / 100;
    }
    // console.log(avail, 3000);

    res.status(200).send({
      result: avail,
      message: 'Availability fetched',
    });
  } catch (error) {
    res.send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};
exports.updateAvailability = async (req, res) => {
  try {
    // check if user is mentor
    const user = await User.findById(req.user._id);
    if (!user.isMentor) {
      return res.status(400).send({
        result: false,
        message: 'You are not a mentor',
      });
    }

    // check if availability is provided
    if (!req.body.actualAvailability) {
      return res.status(400).send({
        result: false,
        message: 'Availability is required',
      });
    }

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
      return res.status(400).send({
        result: false,
        message: 'Please provide valid availability',
      });
    }

    // update availability
    const mentor = await Mentor.findById(user.mentor);
    mentor.actualAvailability = req.body.actualAvailability;
    await mentor.save();

    res.status(200).send({
      result: mentor.actualAvailability,
      message: 'Availability updated',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.deleteAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.isMentor) {
      return res.status(400).send({
        result: false,
        message: 'You are not a mentor',
      });
    }
    // const delSlot = await Mentor.actualAvailability.findByIdAndDelete(
    //   req.params.slotID
    // );

     const delSlot = await Mentor.findOneAndUpdate(
       { _id: user.mentor },
       {
         $pull: {
           [`actualAvailability.${req.params.day}`]: req.body,
         },
       },
       { new: true } // To return the modified document
     );

    if (!delSlot) {
      return res.status(404).json({ result: false, message: 'Slot not found' });
    }
    res
      .status(200)
      .json({ result: delSlot, message: 'Slot successfully deleted' });
  } catch (err) {
    res.status(500).send({
      result: false,
      err: err.message,
      message: 'Unable to delete slot',
    });
  }
};

exports.getMeets = async (req, res) => {
  try {
    if (!req.user.isMentor) {
      return res.status(400).send({
        result: false,
        message: 'You are not a mentor',
      });
    }
    const mentor = await Mentor.findById(req.user.mentor);
    if (!mentor) {
      return res.status(400).send({
        result: false,
        message: 'Mentor not found',
      });
    }
    // console.log(mentor);
    if (!mentor.meetRequests) mentor.meetRequests = '{}';
    const meetRequests = JSON.parse(mentor.meetRequests);
    // open meet from meet Request that is populate
    // console.log(meetRequests);
    let meetRequestsObj = {};
    for (let date in meetRequests) {
      meetRequestsObj[date] = [];
      for (let i = 0; i < meetRequests[date].length; i++) {
        let meetId = meetRequests[date][i];
        const meet = await Meet.findById(meetId);
        meetRequestsObj[date].push(meet);
      }
      // console.log(meetRequestsObj[date]);
    }

    res.status(200).send({
      result: meetRequestsObj,
      message: 'Meets fetched',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.getUpcommingMeet = async (req, res) => {
  try {
    if (!req.user.isMentor) {
      return res.status(400).send({
        result: false,
        message: 'You are not a mentor',
      });
    }
    const mentor = await Mentor.findById(req.user.mentor);

    if (!mentor.meetRequests) mentor.meetRequests = '{}';
    const meetRequests = JSON.parse(mentor.meetRequests);
    // open meet from meet Request that is populate
    // console.log(meetRequests);
    let meetRequestsObj = {};
    for (let date in meetRequests) {
      meetRequestsObj[date] = [];
      for (let i = 0; i < meetRequests[date].length; i++) {
        let meetId = meetRequests[date][i];
        const meet = await Meet.findById(meetId).populate('mentee', [
          'firstname',
          'lastname',
          'profilePicUrl',
        ]);
        if (
          meet.status === MEET_STATUS.ACCEPTED &&
          meet.date >= new Date().toISOString().split('T')[0]
        ) {
          if (
            meet.date == new Date().toISOString().split('T')[0] &&
            meet.e <
              convertFromNormalTime(
                new Date().getHours(),
                new Date().getMinutes()
              )
          )
            continue;
          meetRequestsObj[date].push(meet);
        }
      }
    }

    // remove the keys whose value is empty array
    for (let date in meetRequestsObj) {
      if (meetRequestsObj[date].length === 0) {
        delete meetRequestsObj[date];
      }
    }

    res.status(200).send({
      result: meetRequestsObj,
      message: 'Meets fetched',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.getCompletedMeet = async (req, res) => {
  try {
    if (!req.user.isMentor) {
      return res.status(400).send({
        result: false,
        message: 'You are not a mentor',
      });
    }
    const mentor = await Mentor.findById(req.user.mentor);

    if (!mentor.meetRequests) mentor.meetRequests = '{}';
    const meetRequests = JSON.parse(mentor.meetRequests);
    // open meet from meet Request that is populate
    // console.log(meetRequests);
    let meetRequestsObj = {};
    for (let date in meetRequests) {
      meetRequestsObj[date] = [];
      for (let i = 0; i < meetRequests[date].length; i++) {
        let meetId = meetRequests[date][i];
        const meet = await Meet.findById(meetId).populate('mentee', [
          'firstname',
          'lastname',
          'profilePicUrl',
        ]);
        if (
          meet.status === MEET_STATUS.ACCEPTED &&
          meet.date < new Date().toISOString().split('T')[0]
        ) {
          meetRequestsObj[date].push(meet);
        }
      }
    }

    // remove the keys whose value is empty array
    for (let date in meetRequestsObj) {
      if (meetRequestsObj[date].length === 0) {
        delete meetRequestsObj[date];
      }
    }

    res.status(200).send({
      result: meetRequestsObj,
      message: 'Meets fetched',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.getPendingMeet = async (req, res) => {
  try {
    if (!req.user.isMentor) {
      return res.status(400).send({
        result: false,
        message: 'You are not a mentor',
      });
    }
    const mentor = await Mentor.findById(req.user.mentor);

    if (!mentor.meetRequests) mentor.meetRequests = '{}';
    const meetRequests = JSON.parse(mentor.meetRequests);
    // open meet from meet Request that is populate
    // console.log(meetRequests);
    let meetRequestsObj = {};
    for (let date in meetRequests) {
      meetRequestsObj[date] = [];
      for (let i = 0; i < meetRequests[date].length; i++) {
        let meetId = meetRequests[date][i];
        const meet = await Meet.findById(meetId).populate('mentee', [
          'firstname',
          'lastname',
          'profilePicUrl',
        ]);
        if (
          meet.status === MEET_STATUS.PENDING &&
          meet.date >= new Date().toISOString().split('T')[0]
        ) {
          if (
            meet.date == new Date().toISOString().split('T')[0] &&
            meet.e <
              convertFromNormalTime(
                new Date().getHours(),
                new Date().getMinutes()
              )
          )
            continue;
          meetRequestsObj[date].push(meet);
        }
      }
    }

    // remove the keys whose value is empty array
    for (let date in meetRequestsObj) {
      if (meetRequestsObj[date].length === 0) {
        delete meetRequestsObj[date];
      }
    }

    // check if the mentor is not available any of these meet add a attribute canot be accepted
    // const mentorUser = await User.findById(req.user._id);
    // const mentorMentor = await Mentor.findById(mentorUser.mentor);
    // const mentorActualAvailability = mentorMentor.actualAvailability;
    // // console.log(mentorActualAvailability);
    // for (let date in meetRequestsObj) {
    //     for (let i = 0; i < meetRequestsObj[date].length; i++) {
    //         const meet = meetRequestsObj[date][i];
    //         // console.log(meet);
    //         const day = meet.day;
    //         const s = meet.s;
    //         const e = meet.e;
    //         const date = meet.date;
    //         const dayAvailability = mentorActualAvailability[day];
    //         // console.log(dayAvailability);
    //         if (!isValidOrder({ s, e }, dayAvailability)) {
    //             meet.cannotBeAccepted = true;
    //         }
    //     }
    // }

    res.status(200).send({
      result: meetRequestsObj,
      message: 'Meets fetched',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.getActualAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.isMentor) {
      return res.status(400).send({
        result: false,
        message: 'You are not a mentor',
      });
    }

    const mentor = await Mentor.findById(user.mentor);
    // console.log(mentor);
    res.status(200).send({
      result: mentor.actualAvailability ? mentor.actualAvailability : {},
      message: 'Availability fetched',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.getEarnings = async (req, res) => {
  try {
    let numberOfMentee = 0;
    let totalEarning = 0;
    const earningRecord = {};
    // get meetRequest
    const mentor = await Mentor.findById(req.user.mentor);
    const chargePerHour = mentor.chargePerHour;
    if (!mentor.meetRequests) mentor.meetRequests = '{}';
    const meetRequests = JSON.parse(mentor.meetRequests);
    // open meet from meet Request that is populate
    // console.log(meetRequests);
    for (let date in meetRequests) {
      for (let i = 0; i < meetRequests[date].length; i++) {
        let meetId = meetRequests[date][i];
        const meet = await Meet.findById(meetId).populate('mentee');
        if (meet.status === MEET_STATUS.ACCEPTED) {
          totalEarning += ((meet.e - meet.s) * chargePerHour) / 60;
          const mentee = meet.mentee;
          if (!earningRecord[mentee._id]) {
            earningRecord[mentee._id] = {
              name: mentee.firstname + ' ' + mentee.lastname,
              email: mentee.email,
              totalEarning: 0,
              link: `/profile/${mentee._id}`,
            };
            earningRecord[mentee._id].totalSessions = 0;
            numberOfMentee++;
          }
          earningRecord[mentee._id].totalEarning +=
            ((meet.e - meet.s) * chargePerHour) / 60;
          earningRecord[mentee._id].totalSessions++;
        }
      }
    }
    res.status(200).send({
      result: {
        numberOfMentee,
        totalEarning,
        earningRecord: earningRecord,
      },
      message: 'Earning fetched',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      err: error.message,
      message: 'Internal Server Error',
    });
  }
};

exports.checkProfileComplition = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const profileStatus = eligibleToBecomeMentor(user);
    res.status(200).send({
      result: profileStatus,
      status: user.becomingMentorStatus,
      MENTOR_STATUS_ENUM: MENTOR_STATUS,
      message: 'Profile status fetched',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.requestToBeMentor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profileStatus = eligibleToBecomeMentor(user);
    if (user.isMentor) {
      return res.status(400).send({
        result: false,
        message: 'You are already a mentor',
      });
    }

    if (profileStatus.percentageProfileComplete < 100) {
      return res.status(400).send({
        result: false,
        MENTOR_STATUS_ENUM: MENTOR_STATUS,
        status: user.becomingMentorStatus,
        message: 'Please complete your profile first',
      });
    }
    user.becomingMentorStatus = MENTOR_STATUS.ACCEPTED;

    const notification = new Notification({
      message: `${user.firstname} ${user.lastname}, Your request to become a mentor is received. We will contact you soon`,
      type: NotificationType.INFO,
      link: '/profile/' + user._id,
      __created: new Date() + 1000 * 60,
    });
    await notification.save();
    user.notifications.push(notification._id);
    await user.save();
    res.status(200).send({
      result: true,
      MENTOR_STATUS_ENUM: MENTOR_STATUS,
      status: user.becomingMentorStatus,
      message: 'Request to become a mentor received. We will contact you soon',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

exports.setDataForMentor = async (req, res) => {
  try {
    const { meetChargePerHour } = req.query;
    const user = await User.findById(req.user._id);
    if (!user.isMentor) {
      res.status(400).send({
        result: false,
        message: 'You are not a mentor',
      });
    }
    const mentor = await Mentor.findById(user.mentor);
    if (meetChargePerHour) {
      mentor.chargePerHour = meetChargePerHour;
    }

    await mentor.save();
    res.status(200).send({
      result: mentor,
      message: 'Data updated successfully',
    });
  } catch (error) {
    res.status(500).send({
      result: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  ' https://skillop.in'
);

const REFRESH_TOKEN = null;
exports.createToken = async (req, res) => {
  try {
    const { code } = req.body;
    // res.send(code);
    const response = await oauth2Client.getToken(code);
    REFRESH_TOKEN = response.tokens.refresh_token;
    res.send(response);
  } catch (err) {
    res.send(err);
  }
};

exports.createMeetEvent = async (req, res) => {
  try {
    // FOR CREATING CALENDAR EVENT WITH MEET LINK ATTACHED
    const { summary, description, location, startDateTime, endDateTime } =
      req.body;
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const calendar = google.calendar('v3');
    const resp = calendar.events.insert({
      auth: oauth2Client,
      calendarId: 'primary',
      requestBody: {
        summary,
        description,
        location,
        start: {
          dateTime: new Date(startDateTime),
          timeZone: 'asia/kolkata',
        },
        end: {
          dateTime: new Date(endDateTime),
          timeZone: 'asia/kolkata',
        },
        conferenceData: {
          createRequest: {
            requestId: 'my_skillop_meet' + Math.random().toString(),
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
      conferenceDataVersion: 1,
    });
    res.send(resp);
  } catch (err) {
    res.send(err);
  }
};
