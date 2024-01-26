const axios = require('axios');
const btoa = require('btoa');

exports.scheduleZoomMeet = async (req, res) => {
  // Getting access_token by passing auth_token
  try {
    base_64 = btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET);
    const { access_token } = await axios({
      method: 'POST',
      url: `https://api.zoom.us/oauth/token?grant_type=authorization_code&code=${req.params.auth_code}&redirect_uri=https://skillop.in`,
      headers: {
        Authorization: 'Basic ' + `${base_64} `,
        'Content-Type': 'application/json',
      },
    });
    const meetData = JSON.stringify({
      topic: 'SKILLOP Test ZOOM Meeting',
      type: 2,
      start_time: '2022-01-21T09:20:00',
      duration: 30,
      timezone: 'UTC',
      password: 'skillop-dtu',
      agenda: 'Test Agenda',
      settings: {
        host_video: false,
        participant_video: false,
        cn_meeting: false,
        in_meeting: false,
        join_before_host: false,
        mute_upon_entry: true,
        watermark: false,
        use_pmi: false,
        approval_type: 2,
        audio: 'both',
        auto_recording: 'cloud',
      },
    });

    // Creating/Scheduling Zoom Meeting
    const resp = await axios({
      method: 'post',
      url: 'https://api.zoom.us/v2/users/me/meetings',
      headers: {
        Authorization: 'Bearer ' + `${access_token} `,
        'Content-Type': 'application/json',
      },
      data: meetData,
    });

    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ message: err.message, result: false });
  }
};

exports.listAllMeetings = async (req, res) => {
  // List all scheduled zoom mettings
  try {
     base_64 = btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET);
     const { access_token } = await axios({
       method: 'POST',
       url: `https://api.zoom.us/oauth/token?grant_type=authorization_code&code=${req.params.auth_code}&redirect_uri=https://skillop.in`,
       headers: {
         Authorization: 'Basic ' + `${base_64} `,
         'Content-Type': 'application/json',
       },
     });
    const resp = await axios({
      method: 'GET',
      url: 'https://api.zoom.us/v2/users/me/meetings',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      result: false,
    });
  }
};
