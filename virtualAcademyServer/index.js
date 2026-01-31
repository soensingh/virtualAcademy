const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDb = require("./config/db");
const formRoutes = require("./routes/formRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Virtual Academy API" });
});

app.use("/api", formRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
