import express from "express";
import bodyParser from "body-parser";
import webhookRouter from "./routes/webhook.js";

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/webhook", webhookRouter);

// Health check route
app.get("/", (_, res) => res.send("✅ WhatsApp Bot is up and running!"));
