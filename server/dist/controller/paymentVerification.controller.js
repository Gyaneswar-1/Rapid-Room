export async function paymentVerification(req, res) {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    // here store the data in the data base like payment, checkin information
    console.log("payment verification connroll reached");
    console.log(req.query);
    const { hotelId, checkInDate, stayingFor } = req.query;
    console.log(hotelId, checkInDate, stayingFor);
    return res.redirect("http://localhost:5173/comeingsoon");
}
