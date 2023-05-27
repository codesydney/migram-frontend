import mongoose from "mongoose";

import { Offer as BaseOffer } from "@/types/schemas/Offer";

/**
 * Mongoose Friendly Offer Type with the taskId string field converted to an ObjectId field
 */
type Offer = Omit<BaseOffer, "taskId"> & {
  taskId: mongoose.Schema.Types.ObjectId;
};

const offerSchema = new mongoose.Schema<Offer>({
  userId: {
    type: String,
    ref: "Customer",
    index: true,
    required: true,
  },
  serviceProviderId: {
    type: String,
    ref: "ServiceProvider",
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  message: {
    type: String,
    required: true,
  },
});

export const OfferModel =
  mongoose.models.Offer || mongoose.model<Offer>("Offer", offerSchema);
