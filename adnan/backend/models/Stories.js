const mongoose = require("mongoose");
const { Schema } = mongoose;

const StoriesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
  },
  text: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Stories = mongoose.model("stories", StoriesSchema);

module.exports = Stories;
