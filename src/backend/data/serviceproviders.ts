import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  _id: {
    type: String,
    alias: "userId",
  },
  serviceProviderId: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
  },
});

export const ServiceProvider =
  mongoose.models.ServiceProvider ||
  mongoose.model("ServiceProvider", serviceProviderSchema);
