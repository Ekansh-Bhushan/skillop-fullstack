// MOST LIKED POSTS

const Post = require("../../../models/post");

const {
    response_200,
    response_500,
} = require("../../../utils/responseCode.utils");

exports.getPostMatrics = async (req, res) => {
    try {
        const GET_TOP_OF = req.query.getTopOf || 10;
        const posts = await Post.find({}).populate("author");
        // console.log(posts[0]);
        let totalLikes = 0;
        let totalComments = 0;
        const data = [];
        for (const post of posts) {
            const noOfLikes = post.likes.length;
            const noOfComments = post.comments.length;
            totalLikes += noOfLikes;
            totalComments += noOfComments;
            try {
                data.push({
                    postId: post._id,
                    userId: post.author._id,
                    title: post.title,
                    imageUrls: post.imageUrls,
                    authorName:
                        post.author.firstname + " " + post.author.lastname,
                    authorPic: post.author.profilePicUrl,
                    noOfLikes,
                    noOfComments,
                });
            } catch (error) {}
        }
        data.sort((a, b) => b.noOfLikes - a.noOfLikes);
        const dataToSend = {};
        dataToSend.topLikedPosts = data.slice(0, GET_TOP_OF);
        dataToSend.totalPosts = data.length;
        data.sort((a, b) => b.noOfComments - a.noOfComments);
        dataToSend.topCommentedPosts = data.slice(0, GET_TOP_OF);
        dataToSend.totalLikes = totalLikes;
        dataToSend.totalComments = totalComments;
        // get the best GET_TOP_OF post bast on 3likes is equivalent to 1 comment
        const COMMENT_LIKE_RATIO = process.env.COMMENT_LIKE_RATIO || 3;
        data.sort(
            (a, b) =>
                COMMENT_LIKE_RATIO * b.noOfLikes +
                b.noOfComments -
                COMMENT_LIKE_RATIO * a.noOfLikes -
                a.noOfComments
        );
        dataToSend.topBestPosts = data.slice(0, GET_TOP_OF);
        return response_200(res, "Posts fetched successfully", dataToSend);
    } catch (error) {
        response_500(res, "Error while fetching posts", error);
    }
};
