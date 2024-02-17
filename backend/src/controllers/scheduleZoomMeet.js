const axios = require('axios');
const btoa = require('btoa');
const user = require('../models/user');

exports.scheduleZoomMeet = async (req, res) => {
  // Getting access_token by passing auth_token
  try {
    if(!req.body.start_time) {
      return res.status(400).json({result:false, error:"Start Time is required"})
    }
    base_64 = btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET);
    const auth_code = req.params.auth_code;
    const response = await axios({
      method: 'POST',
      url: `https://api.zoom.us/oauth/token?grant_type=authorization_code&code=${auth_code}&redirect_uri=https://skillop.in/`,
      headers: {
        Authorization: 'Basic ' + `${base_64} `,
        'Content-Type': 'application/json',
      },
    });
    const access_token = response.data.access_token;
    // const refresh_token = response.data.access_token;
    // await user.findByIdAndUpdate(req.user._id, { zoomRefreshToken: refresh_token });

    const meetData = JSON.stringify({
      topic: 'SKILLOP MENTORSHIP MEET',
      type: 2,
      start_time: req.body.start_time,
      duration: 60,
      timezone: 'UTC',
      password: 'SKILLOP',
      agenda: 'MENTORSHIP/GUIDANCE/SUPPORT',
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
      method: 'POST',
      url: 'https://api.zoom.us/v2/users/me/meetings',
      headers: {
        Authorization: 'Bearer ' + `${access_token} `,
        'Content-Type': 'application/json',
      },
      data: meetData,
    });

    res.status(200).json(resp.data);
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
    res.status(200).json(resp.data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      result: false,
    });
  }
};
