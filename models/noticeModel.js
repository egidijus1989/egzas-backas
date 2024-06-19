const mongoose = require("mongoose");
const Category = require("./categoryModel");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A notice must have a title"],
    },
    description: {
      type: String,
      required: [true, "A notice must have a description"],
    },
    price: {
      type: Number,
      required: [true, "A notice must have a price"],
    },
    photo: {
      type: String,
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
