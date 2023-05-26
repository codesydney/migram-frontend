import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    index: true,
    required: true,
  },
  category: {
    type: String,
    enum: ["Cleaning", "Gardening", "Painting", "Other"],
    required: true,
  },
  shortDescription: {
    type: String,
    minlength: 10,
    required: true,
  },
  details: {
    type: String,
    minlength: 25,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "completed"],
    default: "open",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  dueDate: {
    type: Date,
    required: true,
  },
  photos: {
    type: [String],
  },
  location: {
    streetAddress: {
      type: String,
      required: [true, "Street Address is Required."],
    },
    city: {
      type: String,
      required: [true, "City is required."],
    },
    state: {
      type: String,
      enum: {
        values: ["NSW", "ACT", "NT", "QLD", "SA", "TAS", "VIC", "WA"],
      },
      required: [true, "State is required"],
    },
    postal_code: {
      type: String,
      required: [true, "Postcode is required"],
    },
  },
  acceptedOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offer",
    required: true,
  },
});

export const Task = mongoose.model("Task", taskSchema);
