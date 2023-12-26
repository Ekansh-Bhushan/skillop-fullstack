const {
    response_200,
    response_500,
    response_404,
} = require("../../../utils/responseCode.utils");
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
const User = require("../../../models/user");

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            response_404(res, "User not found");
        }
        // remove user from followers
        const followers = user.followers;
        for (let i = 0; i < followers.length; i++) {
            const follower = await User.findById(followers[i]);
            if(!follower) continue;
            follower.followings.pull(userId);
            await follower.save();
        }
        // remove user from following
        const following = user.followings;
        for (let i = 0; i < following.length; i++) {
            const follow = await User.findById(following[i]);
            if(!follow) continue;
            follow.followers.pull(userId);
            await follow.save();
        }
        // remove user from liked post
        const likedPost = user.postLiked;
        console.log(likedPost[0]);
        for (let i = 0; i < likedPost.length; i++) {
            const post = await Post.findById(likedPost[i]);
            console.log(post);
            if (post) {
                post.likes.pull(userId);
                await post.save();
            }
        }
        // remove user from viewed post
        const viewedPost = user.postViewed;
        for (let i = 0; i < viewedPost.length; i++) {
            const post = await Post.findById(viewedPost[i]);
            if(!post) continue;
            post.views.pull(userId);
            await post.save();
        }
        // delete all post
        const posts = user.posts;
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i]);
            if(!post) continue;
            await Post.findByIdAndDelete(posts[i]);
        }
        // delete all comment
        await Comment.deleteMany({ user: userId });
        await User.findByIdAndDelete(userId);
        response_200(res, "User deleted successfully");
    } catch (error) {
        response_500(res, error.message);
    }
};
