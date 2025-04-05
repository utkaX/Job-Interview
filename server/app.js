require("dotenv").config(); 
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const path = require("path");

const app = express();
const port =process.env.PORT || 8000; // Use environment variable for port

// Middleware setup
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "career-craft-7yhqwmfml-karangurjar16s-projects.vercel.app", // Add your production frontend URL
  ],
  methods: "GET,PUT,POST,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

async function main() {
  const dbUri = process.env.DB_URI; 
  await mongoose.connect(dbUri);
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

// Add Hello World route
app.get('/helloworld', (req, res) => {
  res.send('Hello World!');
});

// Start the Express server
const server = app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

const { Server } = require("socket.io");

const io = new Server(server);

const emailtoSocketMapping = new Map();
const sockettoEmailMapping = new Map();

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("join-room", (data) => {
    const { roomId, email } = data;
    console.log("User", email, "joined room", roomId);

    emailtoSocketMapping.set(email, socket.id);
    sockettoEmailMapping.set(socket.id, email);
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { email });
  });

  socket.on("call-user", (data) => {
    const { email, offer } = data;
    const fromEmail = sockettoEmailMapping.get(socket.id);
    const socketId = emailtoSocketMapping.get(email);
    socket.to(socketId).emit("incoming-call", { from: fromEmail, offer });
  });

  socket.on("call-accepted", (data) => {
    const { email, ans } = data;
    const socketId = emailtoSocketMapping.get(email);
    socket.to(socketId).emit("call-accepted", { ans });
  });

  socket.on("disconnect", () => {
    console.log("disconnected");

    const email = sockettoEmailMapping.get(socket.id);
    if (email) {
      console.log("User", email, "disconnected");

      // Remove socket from mappings
      emailtoSocketMapping.delete(email);
      sockettoEmailMapping.delete(socket.id);

      // Optionally, inform the room about the disconnection
      const roomId = Array.from(socket.rooms).find(
        (room) => room !== socket.id
      ); // Get the room the user was in
      if (roomId) {
        socket.broadcast.to(roomId).emit("user-left", { email });
      }
    }
  });
});
