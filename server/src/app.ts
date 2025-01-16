import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/Logger.js";

const app = express();
const morganFormat = ":method :url :status :response-time ms";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost/5173", credentials: true }));
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

// basic healthCheck
import healthCheck from "./routes/HealthCheck.routes.js";
app.use("/api/v1/", healthCheck);

//user authentication
import userAuth from "./routes/user.routes.js";
app.use("/api/v1/", userAuth);

export default app;
