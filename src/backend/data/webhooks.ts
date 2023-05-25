import mongoose from "mongoose";

const webhookEventSchema = new mongoose.Schema({
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

export const WebhookEvent = mongoose.model("WebhookEvent", webhookEventSchema);
