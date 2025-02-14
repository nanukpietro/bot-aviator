const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const TOKEN = process.env.TOKEN_BOT;
const bot = new TelegramBot(TOKEN, { polling: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Configura Express per evitare errori di timeout su Render
app.get("/", (req, res) => {
  res.send("Bot Aviator è attivo!");
});

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Benvenuto! Sono il tuo assistente per Aviator.");
});

// Qui puoi aggiungere altre funzioni per il bot

console.log("Bot Telegram avviato correttamente...");
