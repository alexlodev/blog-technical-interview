/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Third-party imports
import mongoose from "mongoose";

/* ––
 * –––– Schema declaration
 * –––––––––––––––––––––––––––––––––– */
const { Schema, model, models } = mongoose;

const BlogSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  authorImg: {
    type: String,
  },
  date: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  img: {
    type: String,
  },
  captionImage: {
    type: String,
  },
  price: {
    type: String,
  },
  modality: {
    type: String,
  },
  content: {
    type: String,
  },
});

BlogSchema.index({ title: "text", description: "text", author: "text" });

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
