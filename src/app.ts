import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use("/api/v1", routes);
app.use(errorMiddleware);


app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Zippyfy Backend Running 🚀",
  });
});

app.use(errorMiddleware);

export default app;