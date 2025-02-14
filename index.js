const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const dotenv = require('dotenv');

// Carica le variabili d'ambiente
dotenv.config();

// Ottieni il token del bot dalle variabili d'ambiente
const token = process.env.TOKEN_BOT;
const bot = new TelegramBot(token, { polling: true });

// Crea un server web per evitare che Render lo termini
const app = express();

app.get('/', (req, res) => {
    res.send('Bot is running');
});

app.listen(3000, () => {
    console.log('Web server running on port 3000');
});

// Gestisci il comando /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Benvenuto! Sono il tuo assistente per Aviator.');
});

// Aggiungi altri comandi qui...
