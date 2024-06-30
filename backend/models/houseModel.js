const mongoose = require("mongoose");

const houseSchema = mongoose.Schema(
  {
    houseName: {
      type: String,
      required: true,
    },
    houseRent: {
      type: String,
      required: true,
    },
    houseVacancies: {
      type: String,
      required: true,
    },

    houseLocation: {
      type: String,
      required: true,
    },

    houseContact: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const House = mongoose.model("House", houseSchema);

module.exports = House;
