const express=require("express");
const router=express.Router();
const passport = require("passport");
const Song= require("../models/Songs");
const User = require("../models/User");
router.post("/create", passport.authenticate("jwt", {session: false}), async (req, res) =>{
    //session to keep lgoin. but we wanna do jwt always so not
    //mid is for chec, uses token for it.
    //no tokken- automatic error dega
    const {name, thumbnail, track} = req.body;
    if(!name || !thumbnail || !track){
        return res.status(301).json({error :"Insufficient details to create song"});
    }
    const artist=req.user._id;
    const songDetail={name, thumbnail, track, artist};
    const createdSong= await Song.create(songDetail);
    return res.status(200).json(createdSong);
}); 
//get route of all songs I have published (I am artist)
router.get(
    "/get/mysongs", 
    passport.authenticate("jwt", {session: false}),
    async (req, res)=>{
         //if current id==artist id show.
        const songs= await Song.find({artist: req.user._id}).populate("artist");
        return res.status(200).json({data: songs});
    }
)
//get route of all songs some artist has published
//send artist id and see all songs he published
router.get(
    "/get/artist/:artistId", 
    passport.authenticate("jwt", {session: false}),
    async (req, res)=>{
         //if current id==artist id show.
         //note, get usually empty, nothing to input, so later change this req.body, differently
        // const {artistId}= req.body;
        //basically find gives an empty array
        //so not use that
        //![]=false
        //!null=true
        //!undefined=true
        const ArtistId=req.params.artistId;
        const artist= await User.findOne({_id: ArtistId});
        // console.log(artist);


        //correct the error if sent less than length
        if(!artist){
            return res.status(301).json({error: "Artist doesn't exist"});
        }
        const songs= await Song.find({artist:ArtistId});
        return res.status(200).json({data: songs});
    }
)

//get route to get a single song by name. which song etc
router.get(
    "/get/songname/:songname", 
    passport.authenticate("jwt", {session: false}),
    async (req, res)=>{
         //if current id==artist id show.
         //note, get usually empty, nothing to input, so later change this req.body, differently
         //PATTERN MATCHING SEE
        //  const {songName}= req.body;
        const songName=req.params.songname;
        const regex = new RegExp(songName, 'i'); // Create a case-insensitive regex pattern
        const songs = await Song.find({ name: { $regex: regex } }); // Use regex in the query
        // const songs= await Song.find({name: songName});
        return res.status(200).json({data: songs});
        //song with space problem.
    }
)
module.exports=router;