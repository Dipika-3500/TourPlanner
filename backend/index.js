const adminRoutes = require("./routes/admin");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/doctor", require("./routes/doctor"));
app.use("/api/bookings", require("./routes/booking"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));
  app.get("/", (req, res) => {
  res.send("API Running Successfully 🚀");
});


app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    userId: req.user.id
  });
});

app.use("/api/admin", adminRoutes);

