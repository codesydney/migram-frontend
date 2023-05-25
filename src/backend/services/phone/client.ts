import { getConfigs } from "./config";

const { accountSid, authToken, outboundNumber } = getConfigs();

import { Twilio } from "twilio";

const client = new Twilio(accountSid, authToken);

const TWILIO_URL = "http://demo.twilio.com/docs/voice.xml";

export class PhoneService {
  static async makeCall(phone: string) {
    return client.calls.create({
      url: TWILIO_URL,
      from: outboundNumber,
      to: phone,
    });
  }
}
