import mongoose from "mongoose";

const WebhookEventSchema = new mongoose.Schema({
  _id: {
    type: String,
    alias: "eventId",
  },
  source: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export const WebhookEventModel =
  mongoose.models.WebhookEvent ||
  mongoose.model("WebhookEvent", WebhookEventSchema);
