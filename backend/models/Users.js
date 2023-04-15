const mongoose=require("mongoose")
const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  });
  const User=mongoose.model("user", userSchema);
  // User.createIndexes();
module.exports = User;