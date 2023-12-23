import React from "react";
import LandingNav from "./LandingNav";
import LandingOne from "./LandingOne";
import LandingTwo from "./LandingTwo";
import LandingThree from "./LandingThree";
import LandingFour from "./LandingFour";
import LandingFooter from "./LandingFooter";

const Page = () => {
  return (
    <div>
      <div className="md:block hidden">
        <LandingNav />
      </div>
      <LandingOne />
      <LandingTwo />
      <LandingThree />
      <LandingFour />
      <LandingFooter />
    </div>
  );
};

export default Page;
