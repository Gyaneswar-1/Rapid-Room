import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/Logger.js";
import cookieParser from "cookie-parser";
const app = express();
const morganFormat = ":method :url :status :response-time ms";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(morgan(morganFormat, {
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
}));
//user authentication
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user", userRouter);
//hotel CRUD
import hotelCRUD from "./routes/Hotels.routes.js";
app.use("/api/v1/hotel", hotelCRUD);
//wishList routes
import wishlist from "./routes/wishlist.routes.js";
app.use("/api/v1/wishlist", wishlist);
//reviewRouter routes
import reviewRouter from "./routes/review.routes.js";
app.use("/api/v1/review", reviewRouter);
export default app;
