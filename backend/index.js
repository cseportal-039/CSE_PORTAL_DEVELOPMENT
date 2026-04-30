require("dotenv").config();
const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");


const port = process.env.PORT || 8080;
const allowedOrigins = [
  process.env.FRONTEND_API_LINK?.trim(),
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://10.113.0.20:8080",
  /^http:\/\/10.\.\d+\.\d+\.\d+:8080$/,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      
      const isAllowed = allowedOrigins.some(o=>
	o instanceof RegExp ? o.test(origin) : o === origin
      );
      if (isAllowed) {
        return callback(null, true);
      }
      else
        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", cors());

app.use(express.json()); //to convert request data to json

app.get("/", (req, res) => {
  res.send("Hello 👋 I am Working Fine 🚀");
});

app.use("/media", express.static(path.join(__dirname, "media")));

app.use("/api/admin", require("./routes/details/admin-details.route"));
app.use("/api/faculty", require("./routes/details/faculty-details.route"));
app.use("/api/student", require("./routes/details/student-details.route"));

app.use("/api/branch", require("./routes/branch.route"));
app.use("/api/subject", require("./routes/subject.route"));
app.use("/api/notice", require("./routes/notice.route"));
app.use("/api/timetable", require("./routes/timetable.route"));
app.use("/api/material", require("./routes/material.route"));
app.use("/api/exam", require("./routes/exam.route"));
app.use("/api/marks", require("./routes/marks.route"));
app.use("/api/scholar", require("./routes/scholar.route"));
app.use("/api/publication", require("./routes/publication.route"));

connectToMongo().then(() => {
    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  })
  .catch(err => {
    console.error("Mongo failed", err);
  });
