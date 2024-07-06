const expressAsyncHandler = require("express-async-handler");
const House = require("../models/houseModel");

const getHouses = expressAsyncHandler(async (req, res) => {
  const houses = await House.find({ user: req.user._id });
  res.json(houses);
});

const getAllHouses = expressAsyncHandler(async (req, res) => {
  const houses = await House.find({});
  res.json(houses);
});

const createHouse = expressAsyncHandler(async (req, res) => {
  const {
    houseName,
    houseRent,
    houseVacancies,
    houseLocation,
    houseContact,
    housePic,
  } = req.body;

  if (
    !houseName ||
    !houseRent ||
    !houseVacancies ||
    !houseLocation ||
    !houseContact ||
    !housePic
  ) {
    res.status(400);
    throw new Error("Please fill all the Fields");
  } else {
    const house = new House({
      user: req.user._id,
      houseName,
      houseRent,
      houseVacancies,
      houseLocation,
      houseContact,
      housePic,
    });

    const createdHouse = await house.save();

    res.status(201).json(createdHouse);
  }
});

const getHouseById = expressAsyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);

  if (house) {
    res.json(house);
  } else {
    res.status(404).json({ message: "House not found" });
  }
});

const updateHouse = expressAsyncHandler(async (req, res) => {
  const {
    houseName,
    houseRent,
    houseVacancies,
    houseLocation,
    houseContact,
    housePic,
  } = req.body;

  const house = await House.findById(req.params.id);

  if (house.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (house) {
    house.houseName = houseName;
    house.houseRent = houseRent;
    house.houseVacancies = houseVacancies;
    house.houseLocation = houseLocation;
    house.houseContact = houseContact;
    house.housePic = housePic;

    const updatedHouse = await house.save();
    res.json(updatedHouse);
  } else {
    res.status(404);
    throw new Error("House not found");
  }
});

const deleteHouse = expressAsyncHandler(async (req, res) => {
  const house = await House.findById(req.params.id);

  if (house.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (house) {
    await House.findByIdAndDelete(req.params.id);
    res.json({ message: "House Removed" });
  } else {
    res.status(404);
    throw new Error("House not found");
  }
});

module.exports = {
  getHouses,
  getAllHouses,
  createHouse,
  getHouseById,
  updateHouse,
  deleteHouse,
};
