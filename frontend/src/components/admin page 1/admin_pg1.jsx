import React from 'react';
import './admin page 1 css 2.css';
import './admin page 1 css.css';

// Import your images
// import group64 from './public/group-64.svg';
// import vector40 from './public/vector-40.svg';
// import vector from './public/vector.svg';
// import saly12 from './public/saly12@2x.png';
import skillopNoBg1 from './skillop_no_bg 1.png';
import frame55262 from './Frame 55262.png';
import vectorPNG from './Vector.png';
import mdiHelpOutline from './mdi_help-outline.png';
import mdiEvent from './mdi_event.png';
import gridiconsPosts from './gridicons_posts.png';
import frame55250 from './Frame 55250.png';
import materialSymbolsUpload from './material-symbols_upload.png';
import bxCalendar from './bx_calendar.png';

const AdminPage = () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <link rel="stylesheet" href="./admin-page-1-css-2.css" />
        <link rel="stylesheet" href="./admin-page-1-css.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Product Sans Medium:wght@400&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Product Sans:wght@400;700&display=swap" />
      </head>
      <body>
        <div className="events-overview">
          <img className="events-overview-child" alt="" src={vectorPNG} />
          <img className="events-overview-item" alt="" src={vectorPNG} />
          {/* <img className="events-overview-child" alt="" src={group64} />
          <img className="events-overview-item" alt="" src={vector40} /> */}
          <div className="events-overview-inner"></div>
          <div className="ellipse-div"></div>
          <div className="events-overview-child1"></div>
          <div className="events-overview-child2"></div>
          <div className="rectangle-div"></div>
          <img className="vector-icon" alt="" src={vectorPNG} />
          <img className="vector-icon1" alt="" src={vectorPNG} />
          <img className="vector-icon2" alt="" src={vectorPNG} />
          <img className="vector-icon3" alt="" src={vectorPNG} />
          <img className="saly-12-icon" alt="" src={vectorPNG} />
          {/* <img className="vector-icon" alt="" src={vector} />
          <img className="vector-icon1" alt="" src={vector} />
          <img className="vector-icon2" alt="" src={vector} />
          <img className="vector-icon3" alt="" src={vector} />
          <img className="saly-12-icon" alt="" src={saly12} /> */}
          <header className="navbar">
            <div className="navbar-child"></div>
            <img className="skillop-no-bg-1-icon" loading="lazy" alt="" src={skillopNoBg1} />
            <div className="skillop-wrapper">
              <h3 className="skillop">SKILLOP</h3>
            </div>
          </header>
          <section className="frame-section">
            <div className="mentors-parent">
              <div className="mentors">
                <div className="dashboard">
                  <div className="octiconhome-16-parent">
                    <img className="octiconhome-16" loading="lazy" alt="" src={frame55262} />
                    <div className="dashboard-wrapper">
                      <div className="dashboard1">Dashboard</div>
                    </div>
                  </div>
                </div>
                <div className="mdieven">
                  <img className="mdiusers-icon" loading="lazy" alt="" src={vectorPNG} />
                  <div className="users">
                    <div className="users1">Users</div>
                  </div>
                </div>
                <div className="mdieven1">
                  <img className="mdihelp-outline-icon" loading="lazy" alt="" src={mdiHelpOutline} />
                  <div className="mentors-wrapper">
                    <div className="mentors1">mentors</div>
                  </div>
                </div>
                <div className="mdieven2">
                  <img className="mdievent-icon" loading="lazy" alt="" src={mdiEvent} />
                  <div className="events-wrapper">
                    <b className="events">Events</b>
                  </div>
                </div>
                <div className="mdieven3">
                  <img className="gridiconsposts" loading="lazy" alt="" src={gridiconsPosts} />
                  <div className="posts-wrapper">
                    <div className="posts">Posts</div>
                    </div>
                </div>
              </div>
            </div>
          </section>
          <div className="frame-child"></div>
          <div className="frame-item"></div>
          <div className="view-all">
          <div className="events-overview-wrapper">
              <b className="events-overview1">Events overview</b>
            </div>
            <div className="i-e-e-e-d-s-a-hour-hackathon">
            <div className="th-december-p-m">
                <div className="create-event">
                  <b className="listed-events">Listed Events</b>
                  <div className="view-all-wrapper">
                    <b className="view-all-">View All -&gt;</b>
                  </div>
                </div>
              </div>
              <div className="upload">
              <div className="ddmmyyyy-wrapper">
                  <div className="ddmmyyyy">
                    <button className="bxcalendar">
                      <div className="bxcalendar-child"></div>
                      <img className="image-1-icon" alt="" src={frame55250} />
                    </button>
                    <div className="view-details-wrapper">
                      <div className="view-details">
                        <div className="delete">
                          <div className="ieee-dsa-24-hour">
                            IEEE DSA 24-Hour Hackathon
                          </div>
                          <div className="create-eventdescription">
                            <div className="th-december-12pm">
                              5th December, 12PM
                            </div>
                          </div>
                        </div>
                        <div className="view-allevents-parent">
                          <button className="view-allevents">
                            <div className="delete1">
                              <div className="view-details1">View Details</div>
                            </div>
                          </button>
                          <button className="createeventendtime">
                            <div className="delete-wrapper">
                              <div className="delete2">Delete</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="upload-inner">
                <div className="frame-parent">
                    <button className="ellipse-parent">
                      <div className="frame-inner"></div>
                      <img className="image-1-icon1" alt="" src={frame55250} />
                    </button>
                    <div className="frame-wrapper">
                      <div className="frame-group">
                        <div className="ieee-dsa-24-hour-hackathon-parent">
                          <div className="ieee-dsa-24-hour1">
                            IEEE DSA 24-Hour Hackathon
                          </div>
                          <div className="th-december-12pm-wrapper">
                            <div className="th-december-12pm1">
                              5th December, 12PM
                            </div>
                          </div>
                        </div>
                        <div className="frame-container">
                        <button className="frame-button">
                            <div className="view-details-container">
                              <div className="view-details2">View Details</div>
                            </div>
                          </button>
                          <button className="frame-wrapper1">
                            <div className="delete-container">
                              <div className="delete3">Delete</div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="create-event-wrapper">
            <div className="create-event1">
                <div className="eventtitle">
                  <b className="create-event2">Create Event</b>
                </div>
                <div className="materialsymbolsaddcirclefilled">
                  <div className="event-title-wrapper">
                    <input
                      className="event-title"
                      placeholder="Event title"
                      type="text"
                    />
                  </div>
                  <div className="event-description-wrapper">
                    <input
                      className="event-description"
                      placeholder="Event Description"
                      type="text"
                    />
                  </div>
                  <div className="event-meeting-link-wrapper">
                    <input
                      className="event-meeting-link"
                      placeholder="Event Meeting Link"
                      type="text"
                    />
                  </div>
                </div>
                <div className="create-event-inner">
                  <div className="create-event-button-parent">
                    <div className="create-event-button">
                      <div className="upload-cover-image">upload Cover Image</div>
                    </div>
                    <button className="material-symbol-upload-icon">
                      <div className="material-symbol-upload-icon-child"></div>
                      <img
                        className="material-symbolsupload-icon"
                        alt=""
                        src={materialSymbolsUpload}
                      />
                      <div className="upload-wrapper">
                        <div className="upload1">upload</div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="create-event-button1">
                  <div className="frame-parent3">
                    <div className="frame-wrapper5">
                      <div className="frame-parent4">
                        <div className="frame-parent5">
                          <div className="start-time-wrapper">
                            <div className="start-time">Start Time :</div>
                          </div>
                          <div className="dd-mm-yyyy-wrapper">
                            <div className="dd-mm-yyyy">dd-mm-yyyy</div>
                          </div>
                          <img
                            className="bxcalendar-icon"
                            alt=""
                            src={bxCalendar}
                          />
                        </div>
                        <div className="frame-parent6">
                          <div className="end-time-wrapper">
                            <div className="end-time">End Time :</div>
                          </div>
                          <div className="frame-parent7">
                            <div className="dd-mm-yyyy-container">
                              <div className="dd-mm-yyyy1">dd-mm-yyyy</div>
                            </div>
                            <img
                              className="bxcalendar-icon1"
                              alt=""
                              src={bxCalendar}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="delete-button">
                      <div className="create-event3">Create Event</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default AdminPage;
           