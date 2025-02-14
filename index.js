
const TelegramBot = require('node-telegram-bot-api'); 
require('dotenv').config();

const { generaPronostico } = require('./calcolatore');

// Inserisci il tuo Token qui
const token = '7638048247:AAGpQQx2Tf8vE5e4IMYjRRSJvO0B2uiIiC8';

// Creiamo il bot
const bot = new TelegramBot(token, { polling: true });

let ultimeUscite = []; // Memoria delle ultime 10 uscite

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Benvenuto, ${msg.chat.first_name}! Sono il tuo assistente per Aviator.`);
});

// Comando per generare un pronostico
bot.onText(/\/pronostico(?: (.+))?/, (msg, match) => {
    if (match && match[1]) {
        // Se l'utente fornisce nuovi dati, li aggiorniamo
        ultimeUscite = match[1].split(" ").map(Number).filter(n => !isNaN(n)).slice(-10);

        if (ultimeUscite.length === 0) {
            bot.sendMessage(msg.chat.id, "❌ Errore: devi inserire almeno un numero dopo /pronostico.\nEsempio: /pronostico 1.2 2.0 1.8 1.5");
            return;
        }

        bot.sendMessage(msg.chat.id, "✅ Dati aggiornati! Ora puoi scrivere solo /pronostico.");
    }

    if (ultimeUscite.length === 0) {
        bot.sendMessage(msg.chat.id, "❌ Nessun dato salvato! Usa /pronostico con i numeri la prima volta.\nEsempio: /pronostico 1.2 2.0 1.8 1.5");
        return;
    }

    // Generiamo il pronostico usando i dati salvati
    const pronostico = generaPronostico(ultimeUscite);
    bot.sendMessage(msg.chat.id, `📊 Il pronostico di Aviator è: ${pronostico}x`);
});

// Comando per aggiungere una nuova uscita
bot.onText(/\/nuova (.+)/, (msg, match) => {
    if (!match || !match[1]) {
        bot.sendMessage(msg.chat.id, "❌ Errore: devi inserire un numero valido.\nEsempio: /nuova 2.3");
        return;
    }

    const nuovoValore = parseFloat(match[1]);

    if (isNaN(nuovoValore)) {
        bot.sendMessage(msg.chat.id, "❌ Errore: devi inserire un numero valido.\nEsempio: /nuova 2.3");
        return;
    }

    // ✅ Correzione: il valore viene aggiunto senza cancellare i precedenti
    ultimeUscite.push(nuovoValore);
    if (ultimeUscite.length > 10) {
        ultimeUscite.shift(); // Rimuove il valore più vecchio mantenendo la lista di 10 numeri
    }

    bot.sendMessage(msg.chat.id, `✅ Aggiunto ${nuovoValore}. Lista aggiornata: ${ultimeUscite.join(", ")}`);
});

console.log("✅ Bot Telegram avviato correttamente...");
