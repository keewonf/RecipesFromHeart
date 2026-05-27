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
    // Keep CORS restricted to allowed frontend origins
    origin: env.CORS_ORIGIN,
  }),
);
app.use(express.json());

// Limits requests to authentication endpoints (login/session) to prevent brute force attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Time window (15 minutes)
  max: 10, // Maximum number of requests allowed within this window (for each ip)
});

// Same rate limiting strategy as auth, but applied to uploads
const uploadsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

// Apply rate limiting middleware before route handlers
// Ensures all /sessions and /uploads routes are protected
app.use("/sessions", authLimiter);
app.use("/uploads", uploadsLimiter);

app.use(routes);
app.use(errorHandling);

export { app };
