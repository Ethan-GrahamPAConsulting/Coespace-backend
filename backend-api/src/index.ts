import express from "express";
import bookingRoutes from "./routes/booking.routes";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());
app.use(logger);
app.use(bookingRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "active", message: "CoSpace API is running" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export = app;
