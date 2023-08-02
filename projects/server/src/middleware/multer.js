const multer = require("multer");
const { nanoid } = require("nanoid");

const fileUploader = ({
  destinationFolder = "",
  prefix = "POST",
  fileType = "image",
}) => {
  const storageConfing = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`);
    },

    filename: (req, file, cb) => {
      const fileExtention = file.mimetype.split("/")[1];

      const fileName = `${prefix}_${nanoid()}.${fileExtention}`;
      cb(null, fileName);
    },
  });

  const uploader = multer({
    storage: storageConfing,

    fileFilter: (req, file, cb) => {
      if (file.mimetype.split("/")[0] != fileType) {
        return cb(null, false);
      }
      cb(null, true);
    },
  });
  return uploader;
};

const upload = multer({
  limits: {
    fileSize: 10485760,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split("/")[0] != "image") {
      return cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = { fileUploader, upload };
