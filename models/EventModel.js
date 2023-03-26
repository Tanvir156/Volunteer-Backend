const mongoose = require("mongoose");
const eventModel = new mongoose.Schema(
  {
    evenName: {
      type: String,
      required: true,
    },
    evenDescription: {
      type: String,
      required: true,
    },
    evenDate: {
      type: String,
      required: true,
    },
    Banner: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventModel);

module.exports = Event;
