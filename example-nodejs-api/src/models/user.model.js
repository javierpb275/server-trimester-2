const mongoose = require("mongoose");
const validator = require("validator");
const authHelper = require("../helpers/authenticaton.helper");
const Task = require("../models/task.model");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      validate(value) {
        const strongRegex = new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        );
        if (!value.match(strongRegex)) {
          throw new Error("Password is not secure");
        }
      },
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    favoriteTasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "user",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.__v;
  delete userObject.password;
  return userObject;
};

userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({ user: user._id });
  next();
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await authHelper.hashPassword(user.password);
  user.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
