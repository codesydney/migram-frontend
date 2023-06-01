import mongoose, { Model } from "mongoose";

import { Offer as BaseOffer } from "@/types/schemas/Offer";

/**
 * Mongoose Friendly Offer Type with the taskId string field converted to an ObjectId field
 */
export type Offer = Omit<BaseOffer, "task"> & {
  task: mongoose.Schema.Types.ObjectId;
};

const OfferSchema = new mongoose.Schema<Offer>({
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
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    index: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed"],
    default: "Pending",
  },
  message: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  contactPhoto: {
    type: String,
    required: true,
  },
});

export const OfferModel: Model<Offer> =
  mongoose.models.Offer || mongoose.model<Offer>("Offer", OfferSchema);
