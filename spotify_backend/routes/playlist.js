const express=require("express");
const router=express.Router();
const passport = require("passport");
const Playlist= require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Songs");
//create playlist
//all errors taken care, only is length left. see later.
router.post(
    "/create",
    passport.authenticate("jwt", {session: false}),
    async (req, res) =>{
    const currentUser= req.user; // will get from current user only, when creating to current hi karega na
    const {name, thumbnail, songs} = req.body;
    if(!name || !thumbnail || !songs){
        return res.status(301).json({error :"Insufficient data"});
    }
    const playlistData={ 
        name,
        thumbnail, 
        songs, 
        owner: currentUser._id,
        collaborators: []
    };

    const playlist= await Playlist.create(playlistData);
    return res.status(200).json(playlist);
}); 
//get playlist by id
//get playlist Id as a route parameter and return the playlist with that id
//we use req.params here, the improvement, so don't hv to give sth in body in get reqs.
//in routes, usualy we were matching exact match, but if use colon we can take it as variable
//if we use this : then playlistId is available and we can assign it anything.
//kinda pattern match. so value of playlistId will be given by the call. 
//this is req.params. 

router.get(
    "/get/playlist/:playlistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) =>{
    const playlistId= req.params.playlistId;
    const playlist= await Playlist.findOne({_id: playlistId});
    if(!playlist){
        return res.status(301).json({error:"invalid ID"});
    }
    return res.status(200).json(playlist);
}); 

//get all playlist by a person
router.get(
    "/get/artist/:artistId",
    passport.authenticate("jwt", {session: false}),
    async (req, res) =>{
    const artistId = req.params.artistId;
    const artist= await User.findOne({_id: artistId});
    if(!artist){
        return res.status(305).json({error:"Invalid artist Id"});//fix later
    }
    const playlists = await Playlist.find({owner: artistId});
    return res.status(200).json(playlists);
});

//add aong to playlists
router.post(
    "/add/song",
    passport.authenticate("jwt", {session: false}),
    async (req, res) =>{
        const currentUser = req.user;
        // check if current user owns the playlist or is a collaborator
        const {playlistId, songId} = req.body;
        const playlist= await Playlist.findOne({_id: playlistId});
        //problems
        if(!playlist){
            return res.status(305).json({error: "Playlist does not exist"});
        }
        //cant compare object with ==, instead use equals
        if(!playlist.owner.equals(currentUser._id) && !playlist.Collaborators.includes(currentUser._id)){
            return res.status(400).json({error: "Not allowed"});
        }
        const song= await Song.findById(songId);
        if(!song){
            return res.status(305).json({error: "Song does not exist"});
        }
        //add the song to playlist, later on add feature if already in playlist ask him if wanna add again or not
        //imp
        playlist.songs.push(songId);
        await playlist.save(); //to save in db
        return res.status(200).json(playlist);
});
module.exports=router;