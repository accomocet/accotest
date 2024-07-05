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
    housePic: {
      type: String,
      required: true,
      default:
        "https://t4.ftcdn.net/jpg/06/32/19/51/240_F_632195151_xTnjr4xGYG3oGyHiSWeCLLdWTKIVCpfY.jpg",
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
