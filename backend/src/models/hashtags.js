const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./post");

const hashtagScheema = new mongoose.Schema({
    hashtag: {
        type: String,
        required: true,
        unique: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
        },
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
});

hashtagScheema.methods.addPost = async function (post) {
    const hashtag = this;
    hashtag.posts.push(post);
    await hashtag.save();
};

hashtagScheema.methods.addUser = async function (user) {
    const hashtag = this;
    hashtag.users.push(user);
    await hashtag.save();
};

hashtagScheema.methods.removePost = async function (post) {
    const hashtag = this;
    hashtag.posts = hashtag.posts.filter(
        (p) => p.toString() !== post._id.toString()
    );
    await hashtag.save();
};

hashtagScheema.methods.removeUser = async function (user) {
    const hashtag = this;
    hashtag.users = hashtag.users.filter(
        (u) => u.toString() !== user._id.toString()
    );
    await hashtag.save();
};

module.exports = mongoose.model("hashtags", hashtagScheema);
