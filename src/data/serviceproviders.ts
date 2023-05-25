import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  serviceProviderId: {
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

export const ServiceProvider = mongoose.model(
  "ServiceProvider",
  serviceProviderSchema
);
