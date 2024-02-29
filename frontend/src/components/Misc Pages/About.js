
import React,{ useEffect } from 'react';
import './aboutpg.css'; // Make sure to import your CSS file
import pic1 from './pic1.png';
import pic2 from './pic2.png';
import pic3 from './pic3.png';
import pic4 from './pic4.png';
import pic5 from './pic5.png'

import MiscFooter from './MiscFooter';
import MiscNavBar from './MiscNavBar';
import { useNavigate } from "react-router-dom";

 const AboutUs = () => {
   const navigate = useNavigate();
   const signupClicked = () => {
    window.innerWidth < 500 ? navigate("/msignup") : navigate("/signup");
  };
   const redirectToConnectOp = () => {
      window.location.href = 'https://connectop-frontend.vercel.app/';
    };
    const redirectToSynergy =() => {
        window.location.href = 'https://resumify-frontend.vercel.app/';

    };
    const redirectToSkillop =() => {
        window.location.href = 'https://skillop.in';
    };

    useEffect(() => {
      // Scroll to the top when the component mounts
      window.scrollTo(0, 0);
    }, []);
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Your form submission logic here
      const formData = {
        name: e.target.elements.name.value,
        email: e.target.elements.email.value,
        phone: e.target.elements.phone.value,
        info: e.target.elements.info.value,
      };
      console.log(formData);
      
      // Show a pop-up message
      alert('Form submitted successfully!');
    };
  

  return (
    <>
    <MiscNavBar />
     <div>
      <h1 style={{ textAlign: 'center',marginTop:'100px' }}>About Us</h1>

      <div className="aboutpg-box-container">
        <div className=" aboutpg-box1">
          <h2><u>OUR MISSION</u></h2>
          <h1 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}><i>FOSTERING STUDENT EMPOWERMENT</i></h1>
          <p>At Skillop, we believe in the transformative power of education and mentorship. Our mission is to empower college students by connecting them with experienced mentors and providing them with innovative tools for their academic, scholastic and professional journey.</p>
          <img className="image" src={pic1} alt="Mission" />
        </div>
        <div className="aboutpg-box1">
        <h2><u>OUR STORY</u></h2>
        <h1 style={{fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}> <i>"Everyone Has A Story To Tell"</i></h1>
        <p>Skillop began witha simple yet powerful realization:the journey through college and into the professional
            world is rich in potential but often lacking in guidance.We sa w agap between student's needs and 
            resources availaible to them.Driven by a desire to fill this gap, Skillop was born.
        </p>
        <img className="image" src={pic2} alt="Our Story"/>
        </div>
        <div className="aboutpg-box1">
        <h2><u>OUR EVOLUTION</u></h2>
        <h1 style={{fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}><i> MENTORSHIP HUB</i></h1>
        <p>What started as an idea to connect students with mentors has evolved into a dynamic platform.
            We have grown beyond just a meeting place,becoming a hub where students can share their experiences,
            ,learn from others and access tools that streamline their academic and career progress.
        </p>
        <img className="image" src={pic3} alt="Our Evolution"/>
        </div>
        <div className="aboutpg-box1">
        <h2><u>THE "AHA" MOMENT!!</u></h2>
        <h1 style={{fontFamily:' Verdana, Geneva, Tahoma, sans-serif'}}><i>"AHA" LEARNING AND GROWTH </i></h1>
        <p>Our "AHA" moment came when we realized that the key to empowering students is not just providing mentorshio
            but also providing them tools that complement their growth.This led to the development of features like 
            Synergy, InstiD, ConnectOp, which have become integral part of the Skillop experience.
        </p>
        <img className="image" src={pic4} alt="Image description"/>
        </div>
        <div className="aboutpg-box1">
        <h2><u>SERVING OUR STUDENTS</u></h2>
        <h1 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}><i>ALL IN ONE STUDENT GROWTH</i></h1>
        <p>At Skillop,our focus is the ambitious,curious college students eager to learn and grow.Whether 
            its through finding a right mentor,sharing experiences via posts,or using our suit of tools,we 
            are dedicated to providing a comprehensive platform tailored to the unique needs of students.
        </p>
        <img className="image" src={pic5} alt="serving our students"/>
        </div>
    </div>


       <h1 style={{ textAlign: 'center' }}>OUR TOOLS</h1>

      <div className="aboutpg-box-container1">
        <div className="aboutpg-box3" onClick={redirectToSkillop}>
          <h3 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}><b><i>InstiD</i></b></h3>
          <p>A feature that allows students to apply for jobs available on internet at once.</p>
        </div>
        <div className="aboutpg-box3" onClick={redirectToSynergy}>
        <h3 style={{fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}><b><i>Synergy</i></b></h3>
        <p>A tool designed to make company-specific CV's/resumes.</p>
        </div>
        <div className="aboutpg-box3" onClick={redirectToConnectOp}>
        <h3 style={{fontFamily: 'Verdana, Geneva, Tahoma, sans-serif '}}><b><i>ConnectOp</i></b></h3>
        <p>A feature that allows students to apply for jobs available on internet at once.</p>
        </div>

       
       </div>

      
       <div className="aboutpg-box4">
         <h1 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}><i>JOIN US ON OUR JOURNEY!</i></h1>
         <p>Skillop is more than just a platform: it's a community dedicated to nurturing the next generation of leaders, innovators, and thinkers. Join us, share your journey, and let's shape the future together.</p>
         <div className="flex items-center justify-center gap-5 mt-5 relative">
           <button
             className="relative bg-gradient-to-l from-blue-300 via-green-500 to-yellow-500 rounded-lg p-[4px] overflow-hidden hover:shadow-2xl hover:transform hover:scale-105 transition duration-300 "
            onClick={signupClicked}
          >
            <span className=" flex justify-around items-center w-full bg-white rounded-lg px-6 py-2 font-semibold gap-5">
              Get Started
             
            </span>
          </button>
         </div>
        </div>

      <h1 style={{ textAlign: 'center' }}>CONTACT US</h1>

      
       <div className="aboutpg-box-container2">
         <div className="aboutpg-box5">
           <h2 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}><i>Contact Information</i></h2>
           <h3 style={{ fontSize: '20px' }}>Phone number: 9818807886</h3>
           <h3 style={{ fontSize: '20px' }}>Email ID: skillop.skill@gmail.com</h3>
         </div>
         <div className="aboutpg-form-box">
         <h2>Tell Us What's On Your Mind</h2>
         <form onSubmit={handleFormSubmit}>
          
        
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
       
      </div>
    </div>
    <MiscFooter />
    </>
  );
 }

 export default AboutUs;
