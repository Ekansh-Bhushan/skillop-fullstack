const {
    response_200,
    response_500,
    response_404,
} = require("../../../utils/responseCode.utils");
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
const User = require("../../../models/user");
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            response_404(res, "Post not found");
        }

        // remove post from user post array'

        const author = post.author;
        const user = await User.findById(author);
        user.posts.pull(postId);
        await user.save();

        const postLikers = post.likes;
        // remove post from user liked post array
        for (let i = 0; i < postLikers.length; i++) {
            const liker = await User.findById(postLikers[i]);
            if(!liker) continue;
            liker.postLiked.pull(postId);
            await liker.save();
        }

        const postViewed = post.views;
        // remove post from user viewed post array
        for (let i = 0; i < postViewed.length; i++) {
            const viewer = await User.findById(postViewed[i]);
            if(!viewer) continue;
            viewer.postViewed.pull(postId);
            await viewer.save();
        }

        // delete all comment
        const comments = post.comments;

        for (let i = 0; i < comments.length; i++) {
            const comment = await Comment.findById(comments[i]);
            await Comment.findByIdAndDelete(comments[i]);
        }
        await Post.findByIdAndDelete(postId);
        response_200(res, "Post deleted successfully");
    } catch (error) {
        response_500(res, error.message);
    }
};
