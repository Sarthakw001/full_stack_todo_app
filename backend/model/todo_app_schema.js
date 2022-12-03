const mongoose = require("mongoose");

const todo_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      require: true,
    },
    task: [String],
    user_id: String
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("todo", todo_schema);
