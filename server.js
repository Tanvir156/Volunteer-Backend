const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const volenteerRoutes = require("./routes/volenteerRoutes");
const cors = require("cors");
dotenv.config();
mongoose.set("strictQuery", true);
connectDB();
app.use(cors({
  origin: 'https://volunteer-orpin.vercel.app'
}));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/volenteer", volenteerRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT;

const server = app.listen(PORT, console.log("Server runing in 5000"));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://volunteer-orpin.vercel.app",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
