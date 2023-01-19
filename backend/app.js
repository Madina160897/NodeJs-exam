const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const emailsRouter = require("./routers/emailsRouter");
const postsRouter = require("./routers/postRouter");
const followsRouter = require("./routers/followsRouter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/static", express.static(__dirname + '/public'));

mongoose.connect('mongodb+srv://madina160897:madina@cluster0.tshfre4.mongodb.net/?retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log("ERROR", err);
    } else {
        console.log("server started");
        app.use("/post", postsRouter);
        app.use("/emails", emailsRouter);
        app.use("/follows", followsRouter);
        app.listen(8080);
    }
});