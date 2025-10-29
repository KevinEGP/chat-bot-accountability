import { google } from "googleapis";
import { logger } from "../utils/logger.js";

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function appendToSheet(data) {
  const sheets = google.sheets({ version: "v4", auth: await auth.getClient() });
  const spreadsheetId = "1uUN2DVC3YMBfuZt-iLaQFQO-WXrU8GDmsxmj4G3x7qE";
  const range = "Logs!A2";

  if (!data || data.action === null || data.client === null || data.amount === null) {
    throw new Error("Not valid data provided");
  }

  const values = [
    [new Date().toLocaleString(), data.action, data.client, data.identifier, data.amount]
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });

  logger.info("✅ Data added to Google Sheet");
}
