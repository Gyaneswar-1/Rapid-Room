import { useState } from "react";
import Offer from "../components/welcomePage/Offer";
import UserReview from "../components/welcomePage/UserReview";
import WhyBest from "../components/welcomePage/WhyBest";
import Signin from "../components/UserAuth/Signin";
import Signup from "../components/UserAuth/Signup";
import Stat from "../components/welcomePage/Stat";
import WelcomePagenavBar from "../components/welcomePage/WelcomePagenavBar";
import HeroSection from "../components/welcomePage/HeroSection";
import Footer from "../components/Reusable/Footer";

//store
import {  RootState } from "../store/store";
import { useSelector } from "react-redux";


function Welcome() {
  

  //state management
  const { showSignup,showSignin  } = useSelector((state: RootState) => state.showAuthCardReducer);
  

  


  

  

  return (
    <>
      <div className="font-EmCode h-max  relative">
        
        <WelcomePagenavBar
         
        ></WelcomePagenavBar>

       
        <HeroSection ></HeroSection>

        <Offer />

        <WhyBest />
        <Stat/>
        <UserReview />
        <Footer></Footer>
      </div>
      {showSignin && (
        <div>
          <Signin />
        </div>
      )}
      {showSignup && (
        <div>
          <Signup />
        </div>
      )}
    </>
  );
}

export default Welcome;
