const jwt = require("jsonwebtoken");

// Define the getToken function
const getToken = async (email, user) => {
    const token = jwt.sign(
        { identifier: user._id }, // Include user ID in the token payload
        "thiskeyissupposedtobeasecretenvlater" // Secret key for signing the token
    );
    return token; // Return the generated token
};

// Export the getToken function correctly
module.exports = { getToken };
//old
// const jwt=require("jsonwebtoken");
// exports={};

// exports.getToken = async (email, user) => {
// const token= jwt.sign(
// {identifier: user._id},
// "thiskeyissupposedtobeasecretenvlater"
// );
// return token;
// };
// module.exports=exports