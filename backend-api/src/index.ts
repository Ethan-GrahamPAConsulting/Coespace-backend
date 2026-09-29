import express from "express";
import bookingRoutes from "./routes/booking.routes";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import { HTTP_STATUS } from "./constants/httpStatus";

const PORT = Number(process.env.PORT) || 5000;
const app = express();

app.use(express.json());
app.use(logger);
app.use(bookingRoutes);

app.get("/", (req, res) => {
  res.status(HTTP_STATUS.OK).json({ status: "active", message: "CoSpace API is running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export = app;
