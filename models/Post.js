const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = {
   title: {
      type: String,
      required: true
   },
   body: {
      type: String,
      required: true
   },
   videoURL: {
      type: String,
      required: true
   },
   img: {
      // type: Buffer,
      data: Buffer,
      contentType: String,
      // required: true
   },
   author: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
};

const PostSchema = new Schema(post);

module.exports = mongoose.model("posts", PostSchema);