const express = require("express");
const houses = require("./data/houses");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const houseRoutes = require("./routes/houseRoutes");
// const houses = require("./data/houses");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running..");
});

// app.get("/api/houses", (req, res) => {
//   res.json(houses);
// });

app.use("/api/users", userRoutes);
app.use("/api/houses", houseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
