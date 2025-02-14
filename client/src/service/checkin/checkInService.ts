import axios from "axios";

declare global {
  interface Window {
    Razorpay: any;
  }
}
export default async function checkInHandler(amount: number){
    
    const orderRes = await axios.post("http://localhost:3000/api/v1/user/payment/",{
        amount: amount
    })
    
    
    
    const razorpayKey = await axios.get("http://localhost:3000/api/v1/razorpay/getkey");
    
    

    const options = {
        key: razorpayKey.data.data.key, // Replace with your Razorpay key_id
        amount: Number(orderRes.data.data.order.amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        order_id: orderRes.data.data.order.id,
        xxx:"madorchod", // This is the order_id created in the backend
        callback_url: 'http://localhost:3000/api/v1/user/payment-verification', // Your success URL
        prefill: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#0d9488'
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();


}; 