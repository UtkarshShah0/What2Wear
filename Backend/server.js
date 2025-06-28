require("dotenv").config();

const express = require("express");
const cors = require("cors");
const flash = require("connect-flash");
const session = require("express-session");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

// Initializing the app
const app = express();

// Middlewares

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50", extended: true }));
app.use(flash());
app.use(
  session({
    secret: "HEllo", // Set a secret key to sign the session ID cookie
    resave: false,
    saveUninitialized: false,
  })
);

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// mongoose connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected :${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// mongoose schema
const imageSchema = {
  url: {
    type: String,
  },
  description: String,
  tags: [
    {
      type: String,
    },
  ],
  colors: [
    {
      type: String,
    },
  ],
};

const userSchema = {
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: [imageSchema],
};

const User = mongoose.model("Usertests", userSchema);

global.loggedUser = "";

// Utility functions
const uploadToCloudinary = async (
  username,
  base64Image,
  description,
  tags,
  colors
) => {
  let user = await User.findOne({ username: username });

  // if (!user) {
  //   user = new User({ username: username, password: password, images: [] });
  //   console.log(user);
  //   await user.save();
  // }

  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "what2wear-store",
  });
  // console.log(user);
  user.images.push({
    url: result.secure_url,
    description: description,
    tags: tags,
    colors: colors,
  });
  await user.save();

  return result;
};

// endpoints
app.post("/register", (req, res) => {
  // console.log(req.body.username, req.body.password);
  try {
    const newUser = new User({
      username: req.body.email,
      password: req.body.password,
      images: [],
    });

    newUser.save();

    res.status(200).json({ message: "User successfully registered." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.email;
  const pwd = req.body.password;

  find();
  async function find() {
    try {
      const foundUser = await User.findOne({ username: username });
      if (!foundUser) {
        // res.send(`No such user exists, ${username}`);
        throw new Error("User not found");
      } else if (foundUser.password === pwd) {
        // req.flash("user", foundUser.username);

        global.loggedUser = foundUser.username;
        console.log(global.loggedUser);
        res.status(200).json({ message: "Login Successful" });
      } else {
        res.status(401).json({ message: "Wrong Password" });
      }
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
});

app.post("/upload", async (req, res) => {
  // console.log("hello");
  console.log(global.loggedUser);
  // const arr = req.flash("user");
  // console.log(arr);
  // const username = arr[0];
  const username = global.loggedUser;
  console.log(username);
  // const username = "yaku@gmail.com";
  const { description, tags, colors, image } = req.body;

  try {
    const result = await uploadToCloudinary(
      username,
      image,
      description,
      tags,
      colors
    ); // Updated parameter
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    // res.status(500).json({ error: "A server error occurred with this request" });
  }
});

app.get("/user-images", async (req, res) => {
  try {
    // const { username } = req.params;
    // const username = req.flash("user");
    const username = global.loggedUser;
    console.log(username);
    const user = await User.findOne({ username: username });
    // console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user.images);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/hello", (req, res) => {
  // let message = req.flash("user");
  // const loggedUser = message[0];
  // console.log(message);
  console.log(global.loggedUser);
  res.send(global.loggedUser);
});

// Listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
