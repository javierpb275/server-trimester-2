const mongoose = require("mongoose");
const Appointment = require("./appointment.model");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

personSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "person",
});

personSchema.set("toObject", { virtuals: true });
personSchema.set("toJSON", { virtuals: true });

personSchema.pre("remove", async function (next) {
  const person = this;
  await Appointment.deleteMany({ person: person._id });
  next();
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
