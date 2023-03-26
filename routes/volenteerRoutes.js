const express = require("express");
const {
  addEvent,
  showEvent,
  register,
  showList,
} = require("../controllers/volunteerController");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
router.route("/").post(protect, addEvent);
router.route("/registervolun").post(protect, register);
router.route("/show").get(showEvent);
router.route("/showlist").get(showList);

module.exports = router;
