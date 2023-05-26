import mongoose from "mongoose";
import { Task } from "@/types/schemas/Task";

const taskSchema = new mongoose.Schema<Task>({
  customerId: {
    type: String,
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
    enum: ["Open", "In Progress", "Completed"],
    default: "Open",
  },
  paymentStatus: {
    type: String,
    enum: ["N/A", "Payment Due", "Pending", "Paid", "Payment Declined"],
    default: "N/A",
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
  },
});

export const TaskModel =
  mongoose.models.Task || mongoose.model("Task", taskSchema);
