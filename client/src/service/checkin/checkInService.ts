import axios from "axios";
import API from "../api";

declare global {
  interface Window {
    Razorpay: any;
  }
}






export default async function checkInHandler({amount,email,name, phNumber,hotelId, reservationId, paymentId, roomId}:any){
    


    const orderRes = await axios.post(`${API}/user/payment/`,{
        amount: amount
    },{
      withCredentials: true
    })
    
    
    
    const razorpayKey = await axios.get(`${API}/razorpay/getkey`,{
      withCredentials: true
    });
    
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
        callback_url: `${API}/user/payment-verification?hotelId=${Number(hotelId)}&reservationId=${Number(reservationId)}&paymentId=${Number(paymentId)}&roomId=${Number(roomId)}`, // Your success URL
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