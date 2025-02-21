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
import Loader from "../components/Reusable/Loader";



//store and state management //comment remove karibani kehi
import {  RootState } from "../store/store";
import { useSelector } from "react-redux";
import {setShowLoader} from "../store/reducers/loader.reducer" 


function Welcome() {
  

  //state management
  const { showSignup,showSignin  } = useSelector((state: RootState) => state.showAuthCardReducer);
  

  
//state management

const { showLoader } = useSelector((state: RootState) => state.loaderReducer);
  

  

  return (
    <>
    
    {showLoader && <WelComeLoader></WelComeLoader>}
    
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

function WelComeLoader(){
  return(
    <div className="fixed top-0 left-0 h-screen w-screen bg-black z-10 opacity-60">
    <Loader></Loader>

    </div>
  )
}