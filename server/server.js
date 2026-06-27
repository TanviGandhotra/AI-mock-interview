const express = require("express");

const dotenv = require("dotenv");

const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const interviewRoutes = require("./routes/interviewRoutes");
const resumeRoutes =
  require("./routes/resumeRoutes");
app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);
app.use(
  "/api/interview",
  interviewRoutes
);
app.use(
  "/api/resume",
  resumeRoutes
);
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});