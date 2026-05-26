import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandling } from "./middlewares/error-handling";
import { routes } from "./routes";
import { env } from "./env";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);
app.use(express.json());

// Rate limiters for sensitive endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

const uploadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

// Apply rate limiters before routes mount
app.use("/sessions", authLimiter);
app.use("/uploads", uploadsLimiter);

app.use(routes);
app.use(errorHandling);

export { app };
