const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

const mongoose = require("mongoose");
const { Schema } = mongoose;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,PUT,POST,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

async function main() {
  await mongoose.connect('mongodb+srv://gurjarkaran03022004:uiMrlvFtyky53Uog@career-craft.yxphn.mongodb.net/job-interview');
}
main()
  .then(() => {
    console.log("Connected to db.");
  })
  .catch((err) => {
    console.log(err);
  });

const userRoutes = require("./routes/user");
app.use("/users", userRoutes);

const auth = require("./routes/test.js");
app.use("/auth", auth);

const jobRoutes = require('./routes/job');
app.use("/jobs", jobRoutes);

const employeeRoute = require('./routes/employer');
app.use("/employee", employeeRoute);

const jobSeekerRoute = require("./routes/job_seeker.js");
app.use("/jobSeeker", jobSeekerRoute);

const appliedJobRoute = require("./routes/applied_job.js");
app.use("/appliedJob", appliedJobRoute);

const companyRoute = require("./routes/company");
app.use("/company", companyRoute);

const interviewRoute = require("./routes/interview");
app.use("/interview", interviewRoute);

const jobTypeRoute = require('./routes/job_type');
app.use("/jobtype", jobTypeRoute);

const notificationRoute = require("./routes/notification");
app.use("/notification", notificationRoute);

app.listen(port, () => {
  console.log("Connected successfully...");
});
