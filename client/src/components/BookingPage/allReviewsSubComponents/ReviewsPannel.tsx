import { useState } from 'react';
import { FaStar } from 'react-icons/fa'
import {AllReviewCard} from "../reviewsSubcomponents/exportreviewSubComponents"

const ReviewsPannel = ({totalReviews}:{totalReviews:number}) => {
  const [reviewCards,setReviewCards] = useState([
      {
        reviewerImage:
          "https://tse2.mm.bing.net/th?id=OIP.tZJ1pKobeZWWO16pHS3BfwHaE8&pid=Api&P=0&h=180",
        reviewerName: "Amit Sharma",
        reviewerState: "Odisha",
        reviewerCountry: "India",
        reviewerOveralRating: 4,
        reviewerReviewUploadTime: "14 Feb",
        reviewContent:
          "I recently stayed at this hotel during a business trip to Mumbai. The location is excellent, situated in the heart of the city with easy access to public transportation. The staff was courteous and always willing to assist. My room was spacious, and the bed was comfortable, ensuring a good night's sleep. However, I was disappointed with the cleanliness of the bathroom; there were water stains on the mirror, and the floor seemed hastily cleaned. The breakfast buffet offered a variety of options, but the quality was mediocre at best. Additionally, the Wi-Fi connection in my room was unstable, making it difficult to work efficiently. While the hotel has potential, attention to these details would greatly enhance the guest experience..",
      },
      {
        reviewerImage:
          "https://tse4.mm.bing.net/th?id=OIP.EjeY3KH1jYFRy4jsb_6-gQHaHa&pid=Api&P=0&h=180",
        reviewerName: "Priya Nair",
        reviewerState: "Odisha",
        reviewerCountry: "India",
        reviewerOveralRating: 3,
        reviewerReviewUploadTime: "12 June",
        reviewContent:
          "My family and I chose this hotel for our vacation in Kerala. The kids loved the swimming pool, which was clean and well-maintained. The hotel offers a variety of amenities, including a fitness center and a spa, which I appreciated. The rooms were modern and well-furnished, but we found the air conditioning system to be quite noisy at night, disrupting our sleep. The on-site restaurant served a range of dishes, and while the local cuisine was delightful, some of the continental dishes were bland. The staff was friendly but seemed understaffed during peak hours, leading to delays in service. Overall, a pleasant stay but with room for improvement.",
      },
      {
        reviewerImage:
          "https://tse3.mm.bing.net/th?id=OIP.q5CD5hnPMm7bO9TTTFKDIAHaHa&pid=Api&P=0&h=180",
        reviewerName: "Rahul Verma",
        reviewerState: "Odisha",
        reviewerCountry: "India",
        reviewerOveralRating: 4,
        reviewerReviewUploadTime: "13 Oct",
        reviewContent:
          "I stayed at this hotel during a conference in Delhi. The conference facilities were top-notch, with well-equipped rooms and efficient staff. My room had a stunning view of the city skyline, and the housekeeping staff ensured it was always tidy. However, the check-in process was slow, and after a long flight, this was quite frustrating. The in-room dining menu was extensive, but the food often arrived lukewarm. The hotel's proximity to major attractions is a plus, but the noise from the bustling streets was audible even on higher floors. Investing in better soundproofing would be beneficial.",
      },
      {
        reviewerImage:
          "https://img.freepik.com/premium-photo/female-headshot-photos-indian-women-dynamic-profession-occassions_978786-195.jpg",
        reviewerName: "Anjali Desai",
        reviewerState: "Odisha",
        reviewerCountry: "India",
        reviewerOveralRating: 2,
        reviewerReviewUploadTime: "2 Aug",
        reviewContent:
          "During my solo trip to Jaipur, I opted to stay at this hotel. The traditional Rajasthani decor added a charming touch to the ambiance. The rooftop terrace offered a beautiful view of the city, especially during sunset. The staff organized local tours, which made exploring the city hassle-free. On the downside, the room I was assigned had a faint musty smell, and the linens didn't seem freshly laundered. The breakfast spread was decent, but there was a lack of healthy options. Additionally, the complimentary Wi-Fi was slow, making it difficult to stay connected. Despite these issues, the cultural experience provided by the hotel was memorable.",
      },
    ]);
  return (
    <>
        <div className="md:col-span-2 h-full    overflow-y-scroll md:px-8 px-4 ">
                  <div className="top-0  sticky  flex items-center justify-between bg-white  py-2 border-b border-b-gray-300 ">
                    <h1 className="text-2xl font-bold tracking-wide py-4">
                      {totalReviews} reviews
                    </h1>
                    <button className="px-4 py-2 border border-gray-300 rounded-2xl">
                      Most Recent
                    </button>
                  </div>
                  <div className="buttom   md:py-4 py-6 flex flex-col md:gap-4 gap-6">
                    
                    {reviewCards.map((e: any) => {
                            return (
                              <>
                                <AllReviewCard
                                  
                                  reviewerImage={e.reviewerImage}
                                  reviewerName={e.reviewerName}
                                  reviewerState={e.reviewerState}
                                  reviewerCountry={e.reviewerCountry}
                                  reviewerOveralRating={e.reviewerOveralRating}
                                  reviewerReviewUploadTime={e.reviewerReviewUploadTime}
                                  reviewContent={e.reviewContent}
                                ></AllReviewCard>
                                
                              </>
                            );
                          })}
                  </div>
                </div>
    </>
  )
}

export default ReviewsPannel
