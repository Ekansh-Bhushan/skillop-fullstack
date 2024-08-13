import React, { useState, useEffect, useRef } from "react";
import "./newlanding.css";
import { useNavigate } from "react-router-dom";
import LandingNav from "./LandingNav";
import LandingFooter from "./LandingFooter";
import TopBar from "../components/CommonTopBar/TopBar";
import LandingFour from "./LandingFourNew";
import arrow from "../components/images/arrow.png";

import bombay from "../components/images/bombay.jpg";
import Landing from "../components/images/Landing page.png";
import groupphoto from "../components/images/group photo.jpg";
import mlevent from "../components/images/mlevent.png";
import video from "../components/images/landingvideo.mp4";
import delhicop from "../components/images/delhicop.jpg";
import event1 from "../components/images/event1.jpeg";
import event2 from "../components/images/event2.jpg";
import event3 from "../components/images/event3.jpg";
import event4 from "../components/images/event4.jpeg";
import event5 from "../components/images/event5.jpg";
import newsbg from "../components/images/newsbg.png";

import knowMoreIcon from "../components/images/knowmore.png";
import newsEventsIcon from "../components/images/newsevents.png";
import aboutUsIcon from "../components/images/AboutUs.png";

const ImageSlider = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Automatic sliding
    const id = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 10000);

    // Cleanup function
    return () => {
      clearInterval(id);
    };
  }, [images.length]);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      currentImage - 1 >= 0 ? currentImage - 1 : images.length - 1
    );
  };

  return (
    <section className="landing-page-hero">
      <button className="arrow-btn skillop-left-arrow" onClick={prevImage}>
        ❮
      </button>
      <img src={images[currentImage]} alt="Hero Image" className="img-fluid" />
      <button className="arrow-btn right-arrow" onClick={nextImage}>
        ❯
      </button>
    </section>
  );
};

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const whyChooseSkillopRef = useRef(null);
  const messageBoxRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const handleKnowMoreClick = () => {
    if (whyChooseSkillopRef.current) {
      whyChooseSkillopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAboutUsClick = () => {
    navigate("/about");
  };

  const signupClicked = () => {
    navigate(window.innerWidth < 500 ? "/msignup" : "/signup");
  };

  const handleNewsEventClick = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const newsEvents = [
    {
      image: event1,
      headline: "IEEE Hackathon",
      description:
        "We crushed it with a killer Number Plate Detection System using YOLOv8, snagging an epic 17th place! 🚀🔥",
      date: "7th-8th September 2023, MNIT Jaipur",
    },
    {
      image: event2,
      headline: "Intel GenAI Hackathon",
      description:
        "72hr long Hackathon! Using Intel AI Analytic Toolkit We developed Health Assistance and Tumor Detection Chatbot showcasing our Creativity and Hard work💪.",
      date: "March 30 2024, IIT DELHI",
    },
    {
      image: event3,
      headline: (
        <>
          Upcoming Event by Skillop! <br /> Cryptic Hunt on Machine Learning
        </>
      ),
      description:
        "Skillop Society proudly presents the Cryptic Hunt on Machine Learning. Join us for an unforgettable adventure! 🚀🧠 #SkillopTeam",
      date: "September 12 2024, Delhi Technological University",
    },
    {
      image: event4,
      headline: "TechFest IITB",
      description:
        "Secured an impressive 7th place in the competition! 🥳💼  Developed an AI agent designed to streamline the hiring process for companies. 🚀",
      date: "27th-29th December 2023, IIT Bombay",
    },
    {
      image: event5,
      headline: "Vihaan007 Hackathon",
      description:
        "North India's largest student-led hackathon!!🚀 Made it to Top 100! showcasing innovation and determination as we tackled real-world challenges.",
      date: "12th-13th April 2023, Delhi Technological University",
    },
  ];

  const images = [mlevent, delhicop, Landing, groupphoto, bombay];

  return (
    <div className="landing-page-container">
      <div className="md:hidden">
        <TopBar />
      </div>
      <div className="hidden md:block">
        <LandingNav />
      </div>
      <main className="landing-page-main">
        <ImageSlider images={images} />
        <div className="landing-page-boxes">
          <div
            className="landing-page-box know-more"
            onClick={handleKnowMoreClick}
          >
            <h3>Know More</h3>
            <img src={knowMoreIcon} alt="Know More Icon" />
          </div>
          <div
            className="landing-page-box news-events"
            onClick={handleNewsEventClick}
          >
            <h3>Events & Participation</h3>
            <img src={newsEventsIcon} alt="News & Events Icon" />
          </div>
          <div
            className="landing-page-box about-us"
            onClick={handleAboutUsClick}
          >
            <h3>About Us</h3>
            <img src={aboutUsIcon} alt="About Us Icon" />
          </div>
        </div>
        <section className="landing-page-content">
          <p>
            <span className="highlight">
              Welcome to SKILLOP Society, where innovation meets opportunity.
            </span>
            <span>
              Founded with a vision to empower students with cutting-edge skills
              in technology, SKILLOP Society is a vibrant community at the
              forefront of technological advancement. Through different
              workshops, mentorship programs, and competitive events, we
              cultivate a culture of learning, collaboration, and growth. Join
              us to unleash your potential, build meaningful connections, and
              shape the future of technology together.
            </span>
          </p>
        </section>
      </main>
      <button className="get-started-btn" onClick={signupClicked}>
        <span>
          Get Started
          <img src={arrow} alt="Arrow" />
        </span>
      </button>
      <div className="why-choose-skillop" ref={whyChooseSkillopRef}>
        <div className="left-box">
          <h1>Why choose Skillop?</h1>
          <video autoPlay loop muted ref={videoRef}>
            <source src={video} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="right-box">
          <div className="answer-box-1">
            <p>
              <b>Comprehensive Skill Development:</b> Our diverse range of
              workshops and training sessions in areas like Full Stack
              Development, MERN Stack, and emerging technologies ensure you
              acquire practical, in-demand skills.
            </p>
          </div>
          <div className="answer-box-2">
            <p>
              <b>Competitive Edge:</b> Participate in mini tech competitions and
              hackathons to hone your skills and prepare for larger, prestigious
              contests.
            </p>
          </div>
          <div className="answer-box-3">
            <p>
              <b>Practical Experience:</b> Engage in real-world projects and
              events that provide hands-on experience, making you job-ready and
              confident in your abilities.
            </p>
          </div>
        </div>
      </div>

      <div className="message-section" ref={messageBoxRef}>
        <div className="message-container">
          <div className="message-box">
            <h2>Join Our Exciting Events!</h2>
            <p>
              Don't miss the amazing opportunities Skillop has to offer.
              <br></br>
              Join our society where innovation meets collaboration.
            </p>
            <h2> Do Check below:</h2>
            <p>
              - Exciting Upcoming Events We have Planned.
              <br></br>- Highlights of our Enthusiastic Participation in Events.
            </p>
          </div>
          <div className="message-image-container">
            <img src={newsbg} alt="Event" className="message-image" />
          </div>
        </div>
      </div>
      <div className="newsandevent-section">
        <div className="news-grid">
          <div className="news-column">
            <div className="news-card">{renderNewsCard(newsEvents[0])}</div>
            <div className="news-card">{renderNewsCard(newsEvents[1])}</div>
          </div>
          <div className="news-card news-card-large">{renderNewsCard(newsEvents[2])}</div>
          <div className="news-column">
            <div className="news-card">{renderNewsCard(newsEvents[3])}</div>
            <div className="news-card">{renderNewsCard(newsEvents[4])}</div>
          </div>
        </div>
      </div>
      <section className="landing-page-content">
        <p>
          <span className="highlight">
            Dive into Skillop: More Than a Tech Society.
          </span>
          <span>
            Apart from Skillop being a Tech Society, We also present you a
            platfrom "SKILLOP" where Everyone is Mentor and Everyone is Mentee.
            An educational platform buzzing with opportunities to learn, teach,
            and grow together. Here, the exchange of knowledge is endless and
            the features are designed to help you thrive. Ready to explore? Join
            us now and be part of something extraordinary!
          </span>
        </p>
      </section>
      <button className="get-started-btn" onClick={signupClicked}>
        <span>
          Join Us Now!
          <img src={arrow} alt="Arrow" />
        </span>
      </button>

      <LandingFour />
      <LandingFooter />
    </div>
  );

  function renderNewsCard(newsEvent) {
    return (
      <>
        <div className="news-image">
          <img src={newsEvent.image} alt={newsEvent.headline} />
          <div className="news-overlay">
            <h3>{newsEvent.headline}</h3>
          </div>
        </div>
        <div className="news-content">
          <p>{newsEvent.description}</p>
          <span>{newsEvent.date}</span>
        </div>
      </>
    );
  }
};

export default LandingPage;
