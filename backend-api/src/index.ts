import express from "express";
import bookingsRouter from "./routes/bookings";
import router from "./routes/bookings";

const PORT = Number(process.env.PORT) || 3000;
const app = express();
app.use(express.json());
app.use(bookingsRouter);

router.get('/', (req, res) => {
  res.status(200).json({ status: 'active', message: 'CoSpace API is running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export = app;
