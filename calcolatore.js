function generaPronostico(ultimeUscite) {
    if (ultimeUscite.length === 0) {
        return 1.5; // Valore predefinito se non ci sono dati
    }

    const media = ultimeUscite.reduce((a, b) => a + b, 0) / ultimeUscite.length;
    const trendUltimi3 = ultimeUscite.slice(-3).reduce((a, b) => a + b, 0) / 3;
    const ultimoValore = ultimeUscite[ultimeUscite.length - 1];

    let pronostico;

    if (ultimoValore > 10) {
        pronostico = Math.random() * (1.5 - 1.2) + 1.2; // Dopo un valore alto, prevediamo un valore basso
    } else if (ultimoValore < 1.2) {
        pronostico = Math.random() * (1.8 - 1.3) + 1.3; // Dopo un valore molto basso, prevediamo un leggero aumento
    } else if (trendUltimi3 > media) {
        pronostico = Math.random() * (2.5 - 1.5) + 1.5; // Se la tendenza recente è in crescita, prevediamo un valore medio-alto
    } else {
        pronostico = Math.random() * (2.0 - 1.2) + 1.2; // Se il trend è stabile o in calo, prevediamo valori più bassi
    }

    return pronostico.toFixed(2);
}

// Esportiamo la funzione per usarla nel bot
module.exports = { generaPronostico };
