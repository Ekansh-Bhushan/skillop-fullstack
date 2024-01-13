import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import LandingNav from "./LandingNav";
import LandingOne from "./LandingOne";
import LandingTwo from "./LandingTwo";
import LandingThree from "./LandingThree";
import LandingFour from "./LandingFour";
import LandingFooter from "./LandingFooter";
import TopBar from "../components/CommonTopBar/TopBar";
import { Element } from "react-scroll";

const Page = () => {
  return (
    <div>
      <div className="md:hidden">
        <TopBar />
      </div>
      <div className="hidden md:block">
        <LandingNav />
      </div>
      <LandingOne />
      <LandingTwo />
      <Element name="landing-three">
        <LandingThree />
      </Element>
      <LandingFour />
      <LandingFooter />
    </div>
  );
};

export default Page;
