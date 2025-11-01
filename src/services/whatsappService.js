import axios from "axios";
import { logger } from "../utils/logger.js";

const whatsappToken = process.env.WHATSAPP_TOKEN;
const phoneNumberId = process.env.PHONE_NUMBER_ID;

/**
 * Sends a WhatsApp message to a recipient.
 * @param {string} to - WhatsApp number (e.g., "573001234567")
 * @param {string} text - Message body
 */
export async function sendWhatsAppMessage(to, text) {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${whatsappToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    logger.info(`✅ Message sent to ${to}`);
    return response.data;
  } catch (error) {
    logger.error(
      `❌ Failed to send message to ${to}: ${error.response?.data?.error?.message || error.message}`
    );
    throw error;
  }
}
