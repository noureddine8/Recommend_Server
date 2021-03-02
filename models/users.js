import mongoose from "mongoose";

const { Schema, model } = mongoose;
const userSchema = Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Users = model("Users", userSchema);
export default Users;
