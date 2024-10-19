const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");


const app = express();
const port = 8080;

// Middleware setup
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// CORS options
const corsOptions = {
  origin: "http://localhost:5173", // Change this to your client URL
  methods: "GET,PUT,POST,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

// Connect to MongoDB
async function main() {
  await mongoose.connect(
    "mongodb+srv://gurjarkaran03022004:uiMrlvFtyky53Uog@career-craft.yxphn.mongodb.net/job-interview"
  );
}

main()
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/test.js");
const jobRoutes = require("./routes/job");
const employerRoutes = require("./routes/employer");
const jobSeekerRoutes = require("./routes/job_seeker.js");
const appliedJobRoutes = require("./routes/applied_job.js");
const companyRoutes = require("./routes/company");
const interviewRoutes = require("./routes/interview");
const jobTypeRoutes = require("./routes/job_type");
const notificationRoutes = require("./routes/notification");

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/employer", employerRoutes);
app.use("/jobSeeker", jobSeekerRoutes);
app.use("/appliedJob", appliedJobRoutes);
app.use("/company", companyRoutes);
app.use("/interview", interviewRoutes);
app.use("/jobtype", jobTypeRoutes);
app.use("/notification", notificationRoutes);

// Start the Express server
const server = app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});






const {Server} = require("socket.io");

const io = new Server({
  cors:true,
});

const emailtoSocketMapping = new Map();
const sockettoEmailMapping = new Map();

io.on('connection',socket => {
  console.log("New conection");
  
   socket.on('join-room',data =>{
      const {roomId,email} = data;
      console.log("user",email,"joined room",roomId);
      
      emailtoSocketMapping.set(email,socket.id);
      sockettoEmailMapping.set(socket.id,email);
      socket.join(roomId);
      socket.emit("joined-room", {roomId})
      socket.broadcast.to(roomId).emit("user-joined",{email});
   })
   socket.on('call-user',data =>{
    const {email,offer} = data;
    const fromEmail = sockettoEmailMapping.get(socket.id);
    const socketId = emailtoSocketMapping.get(email);
    socket.to(socketId).emit('incoming-call',{from:fromEmail,offer})
   })

   socket.on('call-accepted',data => {
    const {email,ans} = data;
    const socketId = emailtoSocketMapping.get(email);
    socket.to(socketId).emit('call-accepted',{ans })
   })
}) 

io.listen(8001);
