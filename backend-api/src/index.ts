require('dotenv').config();

import express from "express";
import authRoutes from "./routes/auth.routes";
import bookingRoutes from "./routes/booking.routes";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import { HTTP_STATUS } from "./constants/httpStatus";
import { NOTFOUND } from "node:dns";
import { NotFoundError } from "./errors";
import { ForbiddenError } from "./errors/forbiddenError";
const PORT = Number(process.env.PORT) || 5000;
const app = express();

app.use(express.json());
app.use(logger);
app.use(authRoutes);
app.use(bookingRoutes);

app.get("/", (req, res) => {
  throw new Error('Database server exploded')
 
  res.status(HTTP_STATUS.OK).json({ status: "active", message: "CoSpace API is running" });
});
// Route to trigger a test NotFoundError
app.get("/boom-app-error", () => {
  throw new NotFoundError("Test resource not found");
});

// Temporary: trigger a plain, unexpected error to verify sanitized 500 response
app.get("/boom-unexpected", () => {
  throw new Error("db connection string: postgres://user:pass@internal-host/db");
});

app.post("/boom-forbidden", () => {
  throw new ForbiddenError("You do not have permission to perform this action");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/boom-forbidden", () => {
   throw new ForbiddenError("You do not have permission to access this resource");
});


 

export = app;
