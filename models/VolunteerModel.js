const mongoose = require("mongoose");
const volunteerModel = new mongoose.Schema(
  {
    vName: {
      type: String,
      required: true,
    },
    vEmail: {
      type: String,
      required: true,
    },
    vDescription: {
      type: String,
      required: true,
    },
    vDate: {
      type: String,
      required: true,
    },
    vWork: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Volunteer = mongoose.model("Volunteer", volunteerModel);

module.exports = Volunteer;
