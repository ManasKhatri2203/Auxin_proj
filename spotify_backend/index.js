//npm init : package.json- sets that this is a node project
//npm i express : expressjs package installed, came to know we r using express
//use express
//syntax h, export the expresss lib, all function to app.
const express = require("express");
const app = express();
require("dotenv").config();
const port=8000;
const mongoose = require("mongoose");
const passport=require("passport");
const User=require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const JwtStrategy = require('passport-jwt').Strategy;
const cors = require("cors");
ExtractJwt = require('passport-jwt').ExtractJwt;
console.log(process.env);
app.use(cors());
app.use(express.json());
//connect mongodb to node
//has 2 ar guments- 1. which db to connect to, url, 2. connection options (to handle stuff)
mongoose.connect("mongodb+srv://first:"+process.env.MONGO_PASSWORD +"@cluster0.s6vrdue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
 )
 .then((x) => {
    console.log("Connected to Mongo!");
 })
 .catch((err) => {
    console.log("Error while Connecting to Mongo!");
 })
 ;
 //setup passport-jwt

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thiskeyissupposedtobeasecretenvlater";
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload.identifier });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
}));
//API : GET type :/: returns text "Hello World"
app.get("/", (req, res) =>{
    // req contains all data for request
    // res contains all data for the response
    res.send("Hello World");
});
app.use("/auth", authRoutes);  //if starts from auth uses authroutes
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
//now to tell express that our server runs on localhost 8000
app.listen(port, ()=>{
    console.log("App is running on port " + port);
});