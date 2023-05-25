import pino from "pino";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const outboundNumber = process.env.TWILIO_OUTBOUND_NUMBER;

const logger = pino({ name: "Phone Service" });

export function getConfigs() {
  if (!accountSid || !authToken || !outboundNumber) {
    const message =
      "Missing Twilio credentials. Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN & TWILIO_OUTBOUND_NUMBER environment variables.";

    logger.error(
      {
        TWILIO_ACCOUNT_SID: !!accountSid,
        TWILIO_AUTH_TOKEN: !!authToken,
        TWILIO_OUTBOUND_NUMBER: !!outboundNumber,
      },
      message
    );
    throw new Error(message);
  }

  return { accountSid, authToken, outboundNumber };
}
