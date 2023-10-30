const multer = require("multer");
const path = require("path");
require("dotenv").config();
const fs = require("fs");

const profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, "./uploads/public/users");
        cb(null, path.join(__dirname, "public", "users"));
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, req.user._id.toString() + path.extname(file.originalname));
    },
});
const profileBackgroundPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, "./uploads/public/users");
        console.log(file, "hello101");
        cb(null, path.join(__dirname, "public", "users"));
    },
    filename: function (req, file, cb) {
        console.log(file, "hello102");
        cb(
            null,
            req.user._id.toString() +
                "-background" +
                path.extname(file.originalname)
        );
    },
});

const postImagesStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pth = path.join(
            __dirname,
            "public",
            "posts",
            req.user._id.toString()
        );
        fs.mkdirSync(pth, { recursive: true });
        cb(null, pth);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() +
                "-" +
                file.originalname.split(".")[0] +
                path.extname(file.originalname)
        );
    },
});

const paymentConformationPic = multer.diskStorage({
    destination: function (req, file, cb) {
        const pth = path.join(
            __dirname,
            "public",
            "payment",
            req.user._id.toString()
        );
        fs.mkdirSync(pth, { recursive: true });
        cb(null, pth);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() +
                "-" +
                file.originalname.split(".")[0] +
                Date.now().toString() +
                path.extname(file.originalname)
        );
    },
});

const introVideoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pth = path.join(
            __dirname,
            "public",
            "introVideo",
            req.user._id.toString()
        );
        fs.mkdirSync(pth, { recursive: true });
        cb(null, pth);
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() +
                "-" +
                file.originalname.split(".")[0] +
                Date.now().toString() +
                path.extname(file.originalname)
        );
    },
});

const introVideoFilter = (req, file, cb) => {
    if (
        file.mimetype === "video/mp4" ||
        file.mimetype === "video/ogg" ||
        file.mimetype === "video/webm"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only video files are allowed"), false);
    }
};

const profilePicUploader = multer({ storage: profilePicStorage }).single(
    "profilePic"
);

const profileBackgroundPicUploader = multer({
    storage: profileBackgroundPicStorage,
}).single("profileBackgroundPic");

const postImagesUploader = multer({ storage: postImagesStorage }).array(
    "postImages",
    process.env.MAX_IMAGES_PER_POST
);

const paymentConformationPicUploader = multer({
    storage: paymentConformationPic,
}).single("payment-proof");

const introVideoUploader = multer({
    storage: introVideoStorage,
    fileFilter: introVideoFilter,
}).single("introVideo");

module.exports = {
    profilePicUploader,
    postImagesUploader,
    profileBackgroundPicUploader,
    paymentConformationPicUploader,
    introVideoUploader,
};
