Built with Node.js, Twilio, Google Sheets, and Google Gemini AI, this project allows users to:

Receive WhatsApp messages from clients or staff

Automatically parse and structure financial data using AI

Log transactions directly into a Google Sheet for easy tracking

Respond back to WhatsApp with confirmation and summary messages

🚀 Tech Stack

Backend: Node.js + Express# Chat-Bot Accountability 🤖💬

A lightweight WhatsApp chatbot designed to help small businesses track and manage their **sales, payments, and client transactions** — all through simple chat messages.

Built with **Node.js**, **Twilio**, **Google Sheets**, and **Google Gemini AI**, this project allows users to:
- Receive WhatsApp messages from clients or staff
- Automatically parse and structure financial data using AI
- Log transactions directly into a Google Sheet for easy tracking
- Respond back to WhatsApp with confirmation and summary messages

---

## 🚀 Tech Stack
- **Backend:** Node.js + Express
- **AI Parsing:** Google Gemini API (`@google/genai`)
- **Data Storage:** Google Sheets API
- **Messaging Platform:** Twilio WhatsApp Sandbox
- **Deployment:** Render / Railway / Vercel (free tier options)

---

## ⚙️ Features
- Natural-language message parsing (e.g. “Client Juan paid 50,000”)
- Real-time structured logging in Google Sheets
- Automatic confirmation messages
- Modular and scalable architecture
- Easy to deploy and integrate with any small business workflow

---

## 🧩 Folder Structure
```
├── src/
│   ├── config/
│   │   └── messages.js       # Centralized messages
│   ├── services/
│   │   ├── ai-parser.js      # Gemini integration
│   │   └── sheet.js          # Google Sheets logic
│   ├── routes/
│   │   └── webhook.js        # Twilio webhook endpoint
│   └── app.js                # Express setup
├── .env
├── package.json
└── README.md
```

---

## 🧠 Installation & Setup

1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/chat-bot-accountability.git
   cd chat-bot-accountability
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Create a `.env` file and add your keys:
   ```bash
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   GOOGLE_PROJECT_ID=your_project_id
   GOOGLE_CLIENT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY="your_private_key"
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the app  
   ```bash
   npm start
   ```

---

## 💡 Future Improvements
- Add multi-language support (English / Spanish)
- Integrate user authentication
- Generate summary reports automatically
- Add a small dashboard UI

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.


AI Parsing: Google Gemini API (@google/genai)

Data Storage: Google Sheets API

Messaging Platform: Twilio WhatsApp Sandbox

Deployment: Render / Railway / Vercel (free tier options)

⚙️ Features

Natural-language message parsing (e.g. “Client Juan paid 50,000”)

Real-time structured logging in Google Sheets

Automatic confirmation messages

Modular and scalable architecture

Easy to deploy and integrate with any small business workflow
