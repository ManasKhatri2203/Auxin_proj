const mongoose = require("mongoose");
const Song = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String, //url use karenge not image
        required: true,
    },
    track: {
        type: String, //cloud pe string link
        required: true,
    },
    artist: {
        type:  mongoose.Types.ObjectId,
        ref: "User",
        //store userid of artist 
    },

});
const SongModel = mongoose.model("Song", Song);
module.exports = SongModel; 