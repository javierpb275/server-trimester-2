const mongoose = require("mongoose");
const Appointment = require("./appointment.model");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    specialty: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

doctorSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "doctor",
});

doctorSchema.set("toObject", { virtuals: true });
doctorSchema.set("toJSON", { virtuals: true });

doctorSchema.pre("remove", async function (next) {
  const doctor = this;
  await Appointment.deleteMany({ doctor: doctor._id });
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
