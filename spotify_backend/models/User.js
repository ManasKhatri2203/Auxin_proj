const mongoose = require("mongoose");
const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    password : {
        type : String,
        required : true,
        private : true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    likedSongs: {
        //will change to array later
        type: String,
        default: "",
    },
    likedPlaylists: {
        //will change to array later
        type: String,
        default: "",
    },
    subscribedArtists: {
        type: String,
        default: "",
    },
});
const UserModel = mongoose.model("User", User);
module.exports = UserModel; 
