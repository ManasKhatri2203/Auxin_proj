const express=require("express");
const router=express.Router();//only taking router cos sirf uske part needed
const User=require("../models/User");
const bcrypt=require("bcrypt");
const { getToken } = require("../utils/helpers"); //imported diff
//This POST route will help register a new user
router.post("/register", async (req, res) => {
        //this is called when /register api is called as a POST request

        //My req.body will be of the format {email, password, firstname, lastname, username}
        const {email, password, firstName, lastName, userName}=req.body;
        //step-2: if user with same email already exists, then throw error
        const user=await User.findOne({email: email});
        if(user){
            return res
                .status(403)
                .json({error:"A user with this email already exists"});
        }
        //step3- create new user in db
        //step3.1: we do not store password in text, hash
        //parameter- 2 parameter dictate what original becomes to, so fix them for same hash
        //bcrypt already stores the two parameters
        const hashedPassword= await bcrypt.hash(password, 10);
        const newUserData= {
            email,
            password: hashedPassword, 
            firstName, 
            lastName, 
            userName,
        };
        const newUser= await User.create(newUserData);
        //token to return to the user
        const token=await  getToken(email, newUser);
        //return to user
        const userToReturn = {...newUser.toJSON(), token};
        delete userToReturn.password;//not send
        return res.status(200).json(userToReturn);
});
//login
router.post("/login", async (req, res) =>{
    //step1- get email, password from req.body
    const {email, password}=req.body;

    //step-2
    // check if user with that email exists
    const user=await User.findOne({email: email});
        if(!user){
            return res
                .status(403)
                .json({error:"Invalid Credentials"});
        }
    //step-3
    // check if passowrd correct
    //tricky cos we made hash, but cant get back to original. so to check if given pass equal to stored hash, we hash it again and then see
    //so-we make sure ki actual always turn to same hash, by fixing parameters, given on line -21
    //we use bcrypts function to do it
    //bcrypt.compare enables to compare one in plain text  to a hashed password securely
    // if (user.password) {
    //     console.error("Stored password is undefined");
    //     return res.status(500).json({ error: "Internal Sersdvfsdvver Error" });
    // }
    const isPasswordValid = await bcrypt.compare(password, user.password);//bool
        if(!isPasswordValid){
            return res
                .status(403)
                .json({error:"Invalid Credentials"});
                //send same error in above and this, helps in security
                //basically tells othervise what username taken na, can guess
                //atry to be vague to prevent attackers to find details. Like reset password also, generic message fools.
        }
    //step 4
    // ifcorrect, return a token
    //only problem left now
    const token = await getToken(user.email, user);
        //return to user
        const userToReturn = {...user.toJSON(), token};
        delete userToReturn.password;//not send
        return res.status(200).json(userToReturn);

        

})
module.exports=router;