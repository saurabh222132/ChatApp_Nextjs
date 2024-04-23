const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const { connectDB } = require("./config/db.js");
const { AuthRouter } = require("./router/auth.js");
const passport = require("passport");
const { userModel } = require("./model/usermodel.js");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//======================Middlewares================================

app.use(
  cors({
    credentials: true,

    origin: [
      "https://chat-app-nextjs-zeta.vercel.app",
      "https://nextchatapp2.netlify.app",
      "http://localhost:3000",
    ],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ===============requiring Local Strategy===================

require("./config/passport.js");

// ================Connecting to database ====================

// ===================Routers=======================
app.use("/auth", AuthRouter);
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
