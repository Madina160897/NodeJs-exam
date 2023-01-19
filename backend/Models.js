const mongoose = require("mongoose");
const { EmailSchema, NewPostShema, FollowShema } = require("./Schemas");

const EmailModel = mongoose.model("Email", EmailSchema);
const NewPostModel = mongoose.model("New", NewPostShema);
const FollowModel = mongoose.model("Follow", FollowShema);


module.exports = {
    EmailModel,
    NewPostModel,
    FollowModel,
};