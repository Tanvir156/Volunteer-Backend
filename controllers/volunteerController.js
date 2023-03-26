const asyncHandler = require("express-async-handler");
const Volunteer = require("../models/VolunteerModel");
const Event = require("../models/EventModel");
const addEvent = asyncHandler(async (req, res) => {
  const { evenName, evenDescription, evenDate, Banner } = req.body;
  const event = await Event.create({
    evenName,
    evenDescription,
    evenDate,
    Banner,
  });

  if (event) {
    res.status(201).json({
      _id: event._id,
      evenName: event.evenName,
      evenDescription: event.evenDescription,
      evenDate: event.evenDate,
      Banner: event.Banner,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});
const showEvent = asyncHandler(async (req, res) => {
  const event = await Event.find();
  res.json(event);
});
const showList = asyncHandler(async (req, res) => {
  const event = await Volunteer.find();
  res.json(event);
});
const register = asyncHandler(async (req, res) => {
  const { vName, vEmail, vDescription, vDate, vWork } = req.body;
  const volunList = await Volunteer.create({
    vName,
    vEmail,
    vDescription,
    vDate,
    vWork,
  });

  if (volunList) {
    res.status(201).json({
      _id: volunList._id,
      vName: volunList.vName,
      vEmail: volunList.vEmail,
      vDescription: volunList.vDescription,
      vDate: volunList.vDate,
      vWork: volunList.vWork,
    });
  } else {
    res.status(400);
    throw new Error("List not found");
  }
});
module.exports = {
  addEvent,
  showEvent,
  register,
  showList,
};
