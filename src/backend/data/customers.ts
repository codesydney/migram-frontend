import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  _id: {
    type: String,
    alias: "userId",
  },
  customerId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
  },
});

export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
