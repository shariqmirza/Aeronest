const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
    // username & password autometically create using passport-local-mongoose
});

userSchema.plugin(passportLocalMongoose); // this is autometic implementation username, password, hashing, salting.

module.exports = mongoose.model("User", userSchema);