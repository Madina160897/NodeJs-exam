const { Schema } = require("mongoose");

const EmailSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    age: Number,
});

const NewPostShema = new Schema({
    email: String,
    title: String,
    post: String,
    img: String,
    like: Number,
    date: {
        type: Date,
        default: Date.now
    },
})

const FollowShema = new Schema({
   follow: [EmailSchema]
});


module.exports = {
    EmailSchema,
    NewPostShema,
    FollowShema,
};