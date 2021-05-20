require("./models/User")
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const authRoutes = require("./route/authRouters");
const trackRouters = require("./route/trackRoutes");
const requireAuth = require("./middlewares/requireAuth")

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRouters);

const mongoUri = "mongodb+srv://admin:adminadmin@cluster0.stdmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connectted", ()=>{
    console.log("connect on mongoose instance");
});

mongoose.connection.on("error", (err)=>{
    console.log("error connecting to mongo" + err);
});

app.get("/", requireAuth, (req, res) => {
    
    res.send(`Your Email : ${req.user.email}`);
});

app.listen(3000, ()=>{
    console.log("Up!");
})