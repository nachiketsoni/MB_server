const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, default: "", unique: true },
    password: { type: String, default: "",select:false },
    cart: [{ type: mongoose.Types.ObjectId, ref:'Task'}],
    orders: [{ type: mongoose.Types.ObjectId, ref:'Task'}],
  },
  { timestamps: true, versionKey: false }
);

// change user password to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare the use User password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.findOneWithPWD = async function (filter) {
  try {
    const data = await this.findOne(filter).select("+password");
    return data;
  } catch (error) {
    throw new Error("Error while finding user by filter: " + error);
  }
};

module.exports = mongoose.model("User", userSchema);
