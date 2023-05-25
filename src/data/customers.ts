import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  customerId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

export const Customer = mongoose.model("Customer", customerSchema);
