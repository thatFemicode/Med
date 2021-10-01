const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;

const crypto = require("crypto");
require("dotenv").config();

// the below will be coming from the stream dashboard

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;
const signup = async (req, res) => {
  try {
    //   what things do we need to get fro the req.body
    const { fullName, userName, password, phoneNumber } = req.body;
    // the below is a random user id for each user
    // it will be an 16 hexidecimal digits
    const userId = crypto.randomBytes(16).toString("hex");
    // we have to make a connection to stream
    const serverClient = connect(api_key, api_secret, app_id);
    // the server client will be ued to create a new usertoken
    const hashedPassword = await bcrypt.hash(password, 10);
    // we will be creating a token forout user
    const token = serverClient.createUserToken(userId);

    res
      .status(200)
      .json({ token, fullName, userName, userId, hashedPassword, phoneNumber });
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // we will also connect the client using the serverclient connect and weill be creating a
    // new instance of a stream chat
    const serverClient = connect(api_key, api_secret, app_id);
    // we need to do the below becuase we want to query all the users in the database and find the
    // user with that specific username
    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({ name: username });
    if (!users.length)
      return res.status(400).json({ message: "User not found" });

    // if the user does exist we have to bcrypt the password and see if
    // it matched the one the user created hsi or her account with
    const success = await bcrypt.compare(password, users[0].hashedPassword);

    // we also have to create a new user token with the same existing id and
    const token = serverClient.createUserToken(users[0].id);

    if (success) {
      res.status(200).json({
        token,
        fullName: users[0].fullName,
        username,
        userId: users[0].id,
      });
    } else {
      res.status(500).json({ message: "Incorrect Password" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signup, login };
