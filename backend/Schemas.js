const { Schema } = require("mongoose");

const EmailSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    age: Number,
    follows: [],
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


module.exports = {
    EmailSchema,
    NewPostShema,
};