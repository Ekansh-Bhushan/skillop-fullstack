import React, { useState, useEffect, useRef } from "react";
import './newlanding.css'; 
import { useNavigate } from "react-router-dom";
import LandingNav from "./LandingNav";
import LandingFooter from "./LandingFooter";
import TopBar from "../components/CommonTopBar/TopBar";
import LandingFour from "./LandingFour";
import arrow from "../components/images/arrow.png";

import carousel1 from "../components/images/carousel1.png";
import carousel2 from "../components/images/carousel2.jpg";
import carousel3 from "../components/images/carousel3.jpg";
import video from "../components/images/landingvideo.mp4";

import knowMoreIcon from "../components/images/knowmore.png";
import newsEventsIcon from "../components/images/newsevents.png";
import aboutUsIcon from "../components/images/AboutUs.png";

const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const whyChooseSkillopRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // automatic sliding 
    const id = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    setIntervalId(id);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []); 

  const images = [carousel1, carousel2, carousel3];

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 >= 0) ? currentImage - 1 : images.length - 1);
  };

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

  return (
    <div className="landing-page-container">
      <div className="md:hidden">
        <TopBar />
      </div>
      <div className="hidden md:block">
        <LandingNav />
      </div>
      <main className="landing-page-main">
        <section className="landing-page-hero">
          <button className="arrow-btn skillop-left-arrow" onClick={prevImage}>
            ❮
          </button>
          <img src={images[currentImage]} alt="Hero Image" className="img-fluid" />
          <button className="arrow-btn right-arrow" onClick={nextImage}>
            ❯
          </button>
        </section>
        <div className="landing-page-boxes">
          <div className="landing-page-box know-more" onClick={handleKnowMoreClick}>
            <h3>Know More</h3>
            <img src={knowMoreIcon} alt="Know More Icon" />
          </div>
          <div className="landing-page-box news-events">
            <h3>News & Events</h3>
            <img src={newsEventsIcon} alt="News & Events Icon" />
          </div>
          <div className="landing-page-box about-us" onClick={handleAboutUsClick}>
            <h3>About Us</h3>
            <img src={aboutUsIcon} alt="About Us Icon" />
          </div>
        </div>
        <section className="landing-page-content">
          <p>
          Welcome to SKILLOP Society, where innovation meets opportunity. 
          Founded with a vision to empower students with cutting-edge skills 
          in technology, SKILLOP Society is a vibrant community at the forefront 
          of technological advancement. Through workshops, mentorship programs, and
          competitive events, we cultivate a culture of learning, collaboration, and 
          growth. Join us to unleash your potential, build meaningful connections, and 
          shape the future of technology together.
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
          <video autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="right-box">
          <div className="answer-box-1">
            <p>
            <b>Comprehensive Skill Development:</b> Our diverse range of workshops and training 
            sessions in areas like Full Stack Development, MERN Stack, and emerging technologies 
            ensure you acquire practical, in-demand skills. 
            </p>
          </div>
          <div className="answer-box-2">
            <p>
            <b>Competitive Edge:</b> Participate in mini tech competitions and 
            hackathons to hone your skills and prepare for larger, prestigious contests.
            </p>
          </div>
          <div className="answer-box-3">
            <p>
            <b>Practical Experience:</b> Engage in real-world 
            projects and events that provide hands-on experience, 
            making you job-ready and confident in your abilities.
            </p>
          </div>
        </div>
      </div>
      <LandingFour />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
