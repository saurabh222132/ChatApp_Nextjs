const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const { connectDB } = require("./config/db.js");
const { AuthRouter } = require("./router/auth.js");
const passport = require("passport");
const { userModel } = require("./model/usermodel.js");
const { createServer } = require("node:http");
const SocketRouter = require("./router/socket.js");
const { Server } = require("socket.io");

require("dotenv").config();

const OnlineUsers = [];

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected new socket", socket.id);
  // this even fires when any socket is disconnected.
  socket.on("disconnect", (reason) => {
    console.log(OnlineUsers);
    const newOnlineUsers = OnlineUsers.filter((userobj) => {
      return userobj.socketId != socket.id;
    });
    console.log("new onlineusers ", newOnlineUsers);
    io.emit("list-of-online-user-after-any-socket-disconnect", newOnlineUsers);
  });

  socket.on("onlineUserSend", (data) => {
    console.log("Get online user email", data);

    let user = OnlineUsers.findIndex((user) => user.email === data.email);
    // if user is not added in online users then add it's email and scoket.id in online users

    if (user === -1) {
      console.log("in user add sections");
      OnlineUsers.push(data);
    } else {
      console.log("In socketid update section ");
      // if user already added then update it's socket.id in online users list because socket id changes every time if user refresh the page
      OnlineUsers[user]["socketId"] = data.socketId;
    }
    console.log("online users", OnlineUsers);
    io.emit("addNewUserToOnlineList", OnlineUsers);
  });

  // socket.on("disconnect", (data) => {
  //   console.log("Socket disconnectt info ", data);
  // });

  socket.on("recived-message", (data) => {
    console.log("message", data);
    const indx = OnlineUsers.findIndex((userObj) => {
      return userObj.email == data.email;
    });
    // console.log("finding socket.id", OnlineUsers[indx]["socketId"]);
    io.to(OnlineUsers[indx]["socketId"]).emit("get-message", {
      message: data.message,
    });
  });
});

const port = process.env.PORT || 5000;

//======================Middlewares================================

app.use(
  cors({
    credentials: true,
    origin: [
      "https://chat-app-nextjs-zeta.vercel.app",
      "https://nextchatapp2.netlify.app",
      "https://chat-app-nextjs-zeta.vercel.app",
      "http://localhost:3000",
    ],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.authenticate("session"));

// ===============requiring Local Strategy===================

require("./config/passport.js");

// ================Connecting to database ====================

// ===================Routers=======================
app.use("/auth", AuthRouter);
app.use("/socket", SocketRouter);

app.get("/checksession", async (req, res) => {
  if (req.user) {
    const total_users = await userModel.find({}).exec();
    res.send({ success: true, user: req.user, totalUsers: total_users });
  } else {
    res.status(401).json({ success: false, message: "Unathorizedd" });
  }
});
app.get("/authfail", (req, res) => {
  console.log({ req: req, user: req.user });
  res.status(401).send("Auth fail");
});
connectDB();

app.get("/", (req, res) => {
  res.send({ Status: "Your Server Is Live!" });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
