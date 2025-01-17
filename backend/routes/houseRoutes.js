const express = require("express");
const {
  getHouses,
  getAllHouses,
  createHouse,
  getHouseById,
  updateHouse,
  deleteHouse,
} = require("../controllers/houseControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getHouses);
router.route("/all").get(getAllHouses); // New route for getting all houses
router.route("/create").post(protect, createHouse);
router
  .route("/:id")
  .get(getHouseById)
  .put(protect, updateHouse)
  .delete(protect, deleteHouse);

module.exports = router;
