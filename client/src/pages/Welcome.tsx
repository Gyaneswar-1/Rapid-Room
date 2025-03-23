import HeroSection from "../components/welcomePage/HeroSection";
import Offer from "../components/welcomePage/Offer";
import Stat from "../components/welcomePage/Stat";
import UserReview from "../components/welcomePage/UserReview";
import WelcomePageNavBar from "../components/welcomePage/WelcomePageNavBar";
import WhyBest from "../components/welcomePage/WhyBest";


import SetUserDataToStore from "../service/userdata/SetDataToStore";



export default function Home() {
 
  
  return (
    <main>
      <WelcomePageNavBar />
      <HeroSection />
      <Offer />
      <WhyBest />
      <Stat />
      <UserReview />
      <SetUserDataToStore></SetUserDataToStore>
    </main>
  );
}
