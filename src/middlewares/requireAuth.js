const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");


module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).send({error: "You Must logged in"});
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, "My_SECRET_KEY", async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "Invalid token" });
        }

        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};