const express = require("express");
const cors = require("cors");

const app = express();
// routes for sigin in and register
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT || 5000;
require("dotenv").config();
// The below allows for cross origin request

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creating the firsr route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
