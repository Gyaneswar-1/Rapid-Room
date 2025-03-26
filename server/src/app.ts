import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/Logger.js";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import Razorpay from "razorpay";
import paymentRoute from "./routes/payment.routes.js";

const app = express();
const morganFormat = ":method :url :status :response-time ms";

//razorpay instance
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY!,
    key_secret: process.env.RAZORPAY_SECREATE!,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:5173", "https://rapid-room-client.onrender.com"], credentials: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                };
                logger.info(JSON.stringify(logObject));
            },
        },
    }),
);

//healthCheck
import healthCheckRoute from "./routes/healthCheck.routes.js";
app.use("/api/v1/healthcheck",healthCheckRoute);

import AdminRouter from "./routes/admin.routes.js";
app.use("/api/v1/admin",AdminRouter);



//user authentication
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user", userRouter);

import socialAuth from "./routes/socialAuth.routes.js";
app.use("/api/v1", socialAuth);

//hotel CRUD
import hotelCRUD from "./routes/Hotels.routes.js";
app.use("/api/v1/hotel", hotelCRUD);

//wishList routes
import wishlist from "./routes/wishlist.routes.js";
app.use("/api/v1/wishlist", wishlist);

//reviewRouter routes
import reviewRouter from "./routes/review.routes.js";
import razorpayRoute from "./routes/razorpay.routes.js";
app.use("/api/v1/review", reviewRouter);
export default app;

//razorpay routes
app.use("/api/v1/razorpay", razorpayRoute);
app.use("/api/v1/user",paymentRoute);

//payment router
