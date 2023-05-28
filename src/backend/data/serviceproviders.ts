import mongoose from "mongoose";

const ServiceProviderSchema = new mongoose.Schema({
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

export const ServiceProviderModel =
  mongoose.models.ServiceProvider ||
  mongoose.model("ServiceProvider", ServiceProviderSchema);
