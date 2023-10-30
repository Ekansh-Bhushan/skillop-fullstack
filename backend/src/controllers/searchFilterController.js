const User = require("../models/user");
const Post = require("../models/post");
exports.userSearchFilter = async (req, res) => {
    try {
        const { searchBy, searchValue } = req.query;
        const limit = parseInt(req.query.limit | 15);
        const skip = parseInt(req.query.skip | 0);
        console.log(searchBy, searchValue, limit, skip);
        let users;
        if (searchBy === "people") {
            // search each word in name query in first name and last name with limit and skips
            const searchWords = searchValue.split(" ");
            const searchQuery = searchWords.map((word) => {
                return {
                    $or: [
                        { firstname: { $regex: word, $options: "i" } },
                        { lastname: { $regex: word, $options: "i" } },
                    ],
                };
            });
            users = await User.find({ $and: searchQuery })
                .limit(limit)
                .skip(skip);

            return res.status(200).send({
                result: users,
                limit: users.length,
                skip: skip,
                message: "Profile fetched successfully",
            });
        } else if (searchBy === "experence") {
            // search for the users using the searchValue in user.experence array with limit and skips
            // we need to search in the experence array of each user if some work like searh value exist
            // we will use aggregation pipeline to do this
            // we will use $match to filter the users with experence array
            // then we will use $unwind to unwind the experence array
            // then we will use $match to filter the users with experence array
            // lets do
            users = await User.aggregate([
                {
                    $match: {
                        experence: {
                            $elemMatch: {
                                $or: [
                                    {
                                        title: {
                                            $regex: searchValue,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        company: {
                                            $regex: searchValue,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        location: {
                                            $regex: searchValue,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        description: {
                                            $regex: searchValue,
                                            $options: "i",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            ])
                .limit(limit)
                .skip(skip);
            return res.status(200).send({
                result: users,
                limit: users.length,
                skip: skip,
                message: "Profile fetched successfully",
            });
        } else if (searchBy === "education") {
            // lets do the same thing for education
            users = await User.aggregate([
                {
                    $match: {
                        education: {
                            $elemMatch: {
                                $or: [
                                    {
                                        institution: {
                                            $regex: searchValue,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        degree: {
                                            $regex: searchValue,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        fieldOfStudy: {
                                            $regex: searchValue,
                                            $options: "i",
                                        },
                                    },
                                    {
                                        description: {
                                            $regex: searchValue,
                                            $options: "i",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            ])

                .limit(limit)
                .skip(skip);
            return res.status(200).send({
                result: users,
                limit: users.length,
                skip: skip,
                message: "Profile fetched successfully",
            });
        } else {
            return res.status(400).send({
                result: false,
                err: "Invalid searchBy query",
                message: "Invalid searchBy query",
            });
        }
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

exports.filterPosts = async (req, res) => {
    try {
        const searchValue = req.query.searchValue;
        const limit = parseInt(req.query.limit | 15);
        const skip = parseInt(req.query.skip | 0);

        const posts = await Post.find({
            $or: [
                { title: { $regex: searchValue, $options: "i" } },
                { description: { $regex: searchValue, $options: "i" } },
            ],
        })
            .limit(limit)
            .skip(skip);

        return res.status(200).send({
            result: posts,
            limit: posts.length,
            skip: skip,
            message: "Posts fetched successfully",
        });
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};

// new search filter

exports.searchFilterV2 = async (req, res) => {
    try {
        const { searchBy, searchValue } = req.query;
        if (!searchBy || !searchValue)
            return res.status(400).send({
                result: false,
                err: "Invalid searchBy or searchValue query",
                message: "Invalid searchBy or searchValue query",
            });
        const limit = parseInt(req.query.limit | 15);
        const skip = parseInt(req.query.skip | 0);

        // if search by is people, if these option are undefined then filter user on base of name only
        // if any one of them is undefined then filter user on base of that only and name. if both are not undefined
        // then filter user on base of both and name
        const {
            educationInstitution,
            educationDegree,
            educationFieldOfStudy,
            experienceTitle,
            experienceCompany,
            experienceLocation,
        } = req.query;

        // if search by is posts no further query is required

        // now generate the query
        const query = {};
        if (searchBy === "people") {
            // search each word in name query in first name and last name with limit and skips
            const searchWords = searchValue.split(" ");
            const searchQuery = searchWords.map((word) => {
                return {
                    $or: [
                        { firstname: { $regex: word, $options: "i" } },
                        { lastname: { $regex: word, $options: "i" } },
                    ],
                };
            });

            // if education is not undefined then add education query
            if (educationInstitution) {
                const educationInstitutionQuery = {
                    education: {
                        $elemMatch: {
                            $or: [
                                {
                                    institution: {
                                        $regex: educationInstitution,
                                        $options: "i",
                                    },
                                },
                            ],
                        },
                    },
                };
                searchQuery.push(educationInstitutionQuery);
            }

            if (educationDegree) {
                const educationDegreeQuery = {
                    education: {
                        $elemMatch: {
                            $or: [
                                {
                                    degree: {
                                        $regex: educationDegree,
                                        $options: "i",
                                    },
                                },
                            ],
                        },
                    },
                };
                searchQuery.push(educationDegreeQuery);
            }

            if (educationFieldOfStudy) {
                const educationFieldOfStudyQuery = {
                    education: {
                        $elemMatch: {
                            $or: [
                                {
                                    fieldOfStudy: {
                                        $regex: educationFieldOfStudy,
                                        $options: "i",
                                    },
                                },
                            ],
                        },
                    },
                };
                searchQuery.push(educationFieldOfStudyQuery);
            }

            // if experience is not undefined then add experience query
            if (experienceTitle) {
                const experienceTitleQuery = {
                    experence: {
                        $elemMatch: {
                            $or: [
                                {
                                    title: {
                                        $regex: experienceTitle,
                                        $options: "i",
                                    },
                                },
                            ],
                        },
                    },
                };
                searchQuery.push(experienceTitleQuery);
            }

            if (experienceCompany) {
                const experienceCompanyQuery = {
                    experence: {
                        $elemMatch: {
                            $or: [
                                {
                                    company: {
                                        $regex: experienceCompany,
                                        $options: "i",
                                    },
                                },
                            ],
                        },
                    },
                };
                searchQuery.push(experienceCompanyQuery);
            }

            if (experienceLocation) {
                const experienceLocationQuery = {
                    experence: {
                        $elemMatch: {
                            $or: [
                                {
                                    location: {
                                        $regex: experienceLocation,
                                        $options: "i",
                                    },
                                },
                            ],
                        },
                    },
                };
                searchQuery.push(experienceLocationQuery);
            }

            query.$and = searchQuery;
        } else if (searchBy === "posts") {
            // split words
            const searchWords = searchValue.split(" ");
            const searchQuery = searchWords.map((word) => {
                return {
                    $or: [{ title: { $regex: word, $options: "i" } }],
                };
            });
            query.$and = searchQuery;
        } else {
            return res.status(400).send({
                result: false,
                err: "Invalid searchBy query",
                message: "Invalid searchBy query",
            });
        }

        console.log(query);

        let users;
        if (searchBy === "people") {
            users = await User.find(query).limit(limit).skip(skip);

            return res.status(200).send({
                result: users,
                limit: users.length,
                skip: skip,
                message: "Profile fetched successfully",
            });
        } else if (searchBy === "posts") {
            const posts = await Post.find(query)
                .populate("author", "firstname lastname profilePicUrl")
                .limit(limit)
                .skip(skip);

            // Add a link to each post
            posts.forEach((post) => {
                post.link = "/post/" + post._id.toString();
            });

            return res.status(200).send({
                result: posts,
                limit: posts.length,
                skip: skip,
                message: "Posts fetched successfully",
            });
        }
    } catch (error) {
        res.status(500).send({
            result: false,
            err: error.message,
            message: "Internal server error",
        });
    }
};
