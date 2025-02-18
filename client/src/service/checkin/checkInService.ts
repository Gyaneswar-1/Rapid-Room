import axios from "axios";
import API from "../api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type checkInHandlerType = {
  amount: number,
  email: string,
  name: string,
  phNumber: number,
  hotelId: number,
  checkInDate: string,
  stayingFor: number,
}




export default async function checkInHandler({amount,email,name, phNumber,hotelId,checkInDate,stayingFor}:checkInHandlerType){
    


    const orderRes = await axios.post(`${API}/user/payment/`,{
        amount: amount
    })
    
    
    
    const razorpayKey = await axios.get(`${API}/razorpay/getkey`);
    
    if(!orderRes || !razorpayKey){
      return {success: false}
    }

    const options = {
        key: razorpayKey.data.data.key, // Replace with your Razorpay key_id
        amount: Number(orderRes.data.data.order.amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'RapidRoom',
        description: 'Test Transaction',
        order_id: orderRes.data.data.order.id,
        callback_url: `${API}/user/payment-verification?hotelId=${hotelId}&checkInDate=${checkInDate}&stayingFor=${stayingFor}`, // Your success URL
        prefill: {
          name: name,
          email: email,
          contact:phNumber
        },
        theme: {
          color: '#0d9488'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();


}; 