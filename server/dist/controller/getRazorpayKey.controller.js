export function getRazorpayKey(req, res) {
    res.status(200).json({
        success: true,
        data: {
            key: process.env.RAZORPAY_KEY,
        }
    });
}
