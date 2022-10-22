import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  favoriteBlogsIds: {
    type: Array,
    trim: true,
  },
});


const User = models.User || model("User", UserSchema);


export default User;
