const mongoose = require("mongoose");
const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String, //url use karenge not image
        required: true,
    },
    owner: {
        type:  mongoose.Types.ObjectId,
        ref: "user",
        //store userid of artist 
    },
    //songs
    //collaborators
    songs: [
        {   
            //array of songs tell by []
            type: mongoose.Types.ObjectId,
            ref: "Song",
        },
    ],
    Collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: "user",
        }
    ],

});
const PlaylistModel = mongoose.model("Playlist", Playlist);
module.exports = PlaylistModel; 