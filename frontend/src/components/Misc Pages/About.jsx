import React from 'react';
import MiscFooter from './MiscFooter';
import MiscNavBar from './MiscNavBar';
import './AboutUs.css'; 


const About = () => {
  return (
    <>
      <MiscNavBar />
      <div className="md:mx-8 mx-52 my-32">
        <h1 className="text-center mb-7">About Us</h1>
        <div className="flex flex-col gap-7 justify-evenly text-lg">
          <section>
            <h2>Our Mission at Skillop</h2>
            <p>
              At Skillop, we believe in the transformative power of education
              and mentorship. Our mission is to empower college students by
              connecting them with experienced mentors and providing them with
              innovative tools to enhance their academic and professional
              journey.
            </p>
          </section>

          <section>
            <h2>The Story of Skillop</h2>
            <p>
              Skillop began with a simple yet powerful realization: the journey
              through college and into the professional world is rich with
              potential but often lacking in guidance. We saw a gap between
              students' needs and the resources available to them. Driven by a
              desire to bridge this gap, Skillop was born.
            </p>
          </section>

          <section>
            <h2>Our Evolution</h2>
            <p>
              What started as an idea to connect students with mentors has
              evolved into a dynamic platform. We've grown beyond just a meeting
              place, becoming a hub where students can share experiences, learn
              from others, and access tools that streamline their academic and
              career progress.
            </p>
          </section>

          <section>
            <h2>The "Aha!" Moment</h2>
            <p>
              Our "Aha!" moment came when we realized that the key to empowering
              students was not just in providing mentorship but also in offering
              tools that complement their growth. This led to the development of
              features like Synergy, InstiD, and ConnectOp, which have become
              integral parts of the Skillop experience.
            </p>
          </section>

          <section>
            <h2>Serving Our Students</h2>
            <p>
              At Skillop, our focus is the ambitious, curious college student
              eager to learn and grow. Whether it's through finding the right
              mentor, sharing experiences via posts, or using our suite of
              tools, we are dedicated to providing a comprehensive platform
              tailored to the unique needs of students.
            </p>
          </section>

          <section>
            <h2>Our Tools: Synergy, InstiD, and ConnectOp</h2>
            <ul>
              <li>
                <strong>Synergy:</strong> A tool designed to make
                company-specific CVs/Resumes.
              </li>
              <li>
                <strong>InstiD:</strong> A feature that allows students to apply
                to all jobs available on the internet at once.
              </li>
              <li>
                <strong>ConnectOp:</strong> Our networking feature that enables
                students wanting to go abroad to connect, share, and learn from
                students already studying there.
              </li>
            </ul>
          </section>

          <section>
            <h2>Join Us on Your Journey</h2>
            <p>
              Skillop is more than just a platform; it's a community dedicated
              to nurturing the next generation of leaders, innovators, and
              thinkers. Join us, share your journey, and let's shape the future
              together.
            </p>
          </section>
        </div>
      </div>
      <MiscFooter />
    </>
  );
};

export default About;
