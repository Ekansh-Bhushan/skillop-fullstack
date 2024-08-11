import React from "react";
import "./AboutNew.css"; // Make sure to import your CSS file
import pic1 from "./pic1.png";
import pic2 from "./pic2.png";
import pic3 from "./pic3.png";
import pic4 from "./pic4.png";
import pic5 from "./pic5.png";
import pic6 from "./pic6.jpg";
import pic7 from "./pic7.jpg";
import pic9 from "./pic9.png";
import pic10 from "./pic10.jpg";
import pic11 from "./pic11.jpg";

import MiscFooter from "./MiscFooter";
import MiscNavBar from "./MiscNavBar";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const signupClicked = () => {
    window.innerWidth < 500 ? navigate("/msignup") : navigate("/signup");
  };
  const redirectToConnectOp = () => {
    window.location.href = "https://connectop-frontend.vercel.app/";
  };
  const redirectToSynergy = () => {
    window.location.href = "https://resumify-frontend.vercel.app/";
  };
  const redirectToSkillop = () => {
    window.location.href = "https://skillop.in";
  };

  return (
    <>
      <MiscNavBar />
      <div className="aboutpg-container">
        <div className="aboutpg-hero">
          <p>
            Welcome to <b>SKILLOP SOCIETY</b> at Delhi Technological University.
          </p>
        </div>

        <div className="aboutpg-grid">
          <div className="aboutpg-box">
            <h2>About Us</h2>
            <p>
              Skillop Society is a student-run organization at Delhi
              Technological University, dedicated to fostering innovation,
              creativity, and skill development among students. At SKILLOP, we
              believe in the power of education, collaboration, and mentorship
            </p>
          </div>

          <div className="aboutpg-box">
            <h2>Our Mission</h2>
            <p>
              Our mission is to bridge the gap between academic learning and
              real-world application through workshops, projects, and
              competitions. We strive to foster an environment of continuous
              learning and innovation, preparing students for successful careers
              in the tech industry.
            </p>
          </div>

          <div className="aboutpg-box">
            <h2>What We Offer</h2>
            <p>
              We offer a range of initiatives, including workshops, webinars,
              tech competitions, mentorship programs, and skill development
              initiatives. Our goal is to provide students with the tools and
              opportunities needed to excel in the tech industry.
            </p>
          </div>

          <div className="aboutpg-box">
            <h2>Achievements</h2>
            <p>
              Our members have achieved success in various hackathons and
              competitions, and have developed innovative projects and
              solutions. We are proud to support their continuous growth and
              accomplishments, fostering a culture of excellence and
              collaboration.
            </p>
          </div>
        </div>

        <div className="aboutpg-section our-tools-section">
          <h2>Our Tools</h2>
          <p>
            We have developed a range of tools to help you achieve your goals.
          </p>
          <div class="our-tools-grid">
            <div class="our-tool-box" onClick={redirectToConnectOp}>
              <h2>ConnectOp</h2>
              <img src={pic9} alt="ConnectOp" />
              <div class="text-content">
                <p>
                  A feature that allows students to apply for jobs available on
                  internet at once.
                </p>
              </div>
            </div>
            <div class="our-tool-box" onClick={redirectToSynergy}>
              <h2>Synergy</h2>
              <img src={pic10} alt="Synergy" />
              <div class="text-content">
                <p>A tool designed to make company-specific CV's/resumes.</p>
              </div>
            </div>
            <div class="our-tool-box" onClick={redirectToSkillop}>
              <h2>InstiD</h2>
              <img src={pic11} alt="InstiD" />
              <div class="text-content">
                <p>
                  A feature that allows students to apply for jobs available on
                  internet at once.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="our-faculty-grid">
          <h1 style={{ textAlign: "center" }}>OUR FACULTY</h1>
          <div className="our-faculty-container">
            <div className="our-faculty-box">
              <img src={pic6} alt="Dr Mahendra Singh Niranjan" />
              <h3>
                <b>Dr Mahendra Singh Niranjan [Faculty Advisior]</b>
              </h3>
              <p>
                Welcome, students! As your advisor, I am here to support you in
                achieving your goals and navigating your journey. I bring 17
                years of experience in DTU , and I'm here to support you with
                workshops, mentorship, and industry connections.Make the most of
                this opportunity for learning, growth, and collaboration.
              </p>
            </div>
            <div className="our-faculty-box">
              <img src={pic7} alt="Prof Ranganathan M S" />
              <h3>
                <b>Prof Ranganathan M S [Co-Faculty Advisior]</b>
              </h3>
              <p>
                Welcome to our community! As your Co-Faculty Advisor, I'm
                excited to share my expertise and experience with you. With over
                26 years of experience at Delhi Technological University,
                leading the Department of Design I've developed a passion for
                innovative product design and industrial processes that
                prioritize sustainability and human-centricity. Together, let's
                harness our collective creativity and collaborative spirit to
                drive positive change and create a better future for all.
              </p>
            </div>
          </div>
        </div>

        <div className="join-us-grid">
          <h1 style={{ textAlign: "center" }}>JOIN US ON OUR JOURNEY!</h1>
          <div className="join-us-container">
            <p>
              Skillop is more than just a platform: it's a Society dedicated to
              nurturing the next generation of leaders, innovators, and
              thinkers. Join us, share your journey, and let's shape the future
              together.
            </p>
            <button className="join-us-button" onClick={signupClicked}>
              Get Started
            </button>
          </div>
        </div>

        <div className="aboutpg-box-container2">
          <div className="aboutpg-form-box">
            <h2>Tell Us What's On Your Mind</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Add your form submission logic here
                // You can access form data using e.target.elements
                const formData = {
                  name: e.target.elements.name.value,
                  email: e.target.elements.email.value,
                  phone: e.target.elements.phone.value,
                  info: e.target.elements.info.value,
                };
              }}
            >
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div className="form-group">
                <label htmlFor="info">What's on your mind:</label>
                <input type="text" id="info" name="info" required />
              </div>

              <div className="form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-container">
              <div className="info-item">
                <p>Phone number: 7303615680</p>
              </div>
              <div className="info-item">
                <p>Email ID: skillop.skill@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <MiscFooter />
      </footer>
    </>
  );
};

export default AboutUs;
