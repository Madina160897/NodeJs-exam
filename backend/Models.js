const mongoose = require("mongoose");
const { EmailSchema, NewPostShema } = require("./Schemas");

const EmailModel = mongoose.model("Email", EmailSchema);
const NewPostModel = mongoose.model("New", NewPostShema);


module.exports = {
    EmailModel,
    NewPostModel,
};