const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    console.log("Received file MIME type:", file.mimetype);
    console.log("Received file name:", file.originalname);

    const allowedMimeTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/octet-stream"
    ];

    const allowedExtensions = [
        ".pdf",
        ".doc",
        ".docx"
    ];

    const fileExtension = path
        .extname(file.originalname)
        .toLowerCase();

    const isMimeTypeAllowed = allowedMimeTypes.includes(file.mimetype);
    const isExtensionAllowed = allowedExtensions.includes(fileExtension);

    if (isMimeTypeAllowed && isExtensionAllowed) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOC, and DOCX files are allowed"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;