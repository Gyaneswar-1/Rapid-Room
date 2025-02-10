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

function Welcome() {
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const toggleSignup = () => {
    setSignup(!signup);
  };

  const toggleSignin = () => {
    setSignin(!signin);
  };

  return (
    <>
      <div className="font-EmCode h-max  relative">
        
        <WelcomePagenavBar
          toggleSignup={() => {
            toggleSignup();
          }}
          toggleSignin={() => {
            toggleSignin();
          }}
        ></WelcomePagenavBar>

       
        <HeroSection toggleSignup={toggleSignup} handleEmailChange={handleEmailChange} ></HeroSection>

        <Offer />

        <WhyBest />
        <Stat/>
        <UserReview />
        <Footer></Footer>
      </div>
      {signin && (
        <div>
          <Signin closeSignin={toggleSignin} />
        </div>
      )}
      {signup && (
        <div>
          <Signup closeSignup={toggleSignup} email={email} />
        </div>
      )}
    </>
  );
}

export default Welcome;
