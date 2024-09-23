const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const cookieParser = require("cookie-parser");

let methodOverride = require("method-override");
const path = require("path");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
const users = require("./models/user.js");
const user = require("./models/user.js");
const Schema = mongoose.Schema;

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,PUT,POST,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log("Connected successfully...");
});

main()
  .then(() => {
    console.log("Connected to db.");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(
    "mongodb+srv://gurjarkaran03022004:uiMrlvFtyky53Uog@career-craft.yxphn.mongodb.net/job-interview"
  );
}

const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

const auth = require("./routes/test.js");
app.use("/auth", auth);

const jobRoutes = require("./routes/job");
app.use("/jobs", jobRoutes);

const employeeRoute = require("./routes/employer");
app.use("/employee", employeeRoute);

const jobSeekerRoute = require("./routes/job_seeker.js");
app.use("/jobSeeker", jobSeekerRoute);

const appliedJobRoute = require("./routes/applied_job.js");
app.use("/appliedJob", appliedJobRoute);

const companyRoute = require("./routes/company");
app.use("/company", companyRoute);

const eventRoute = require("./routes/event");
app.use("/event", eventRoute);

const interviewRoute = require("./routes/interview");
app.use("/interview", interviewRoute);

const notificationRoute = require("./routes/notification");
app.use("/notification", notificationRoute);
