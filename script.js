'use strict';

// creo il numero segreto casuale da indovinare (fuori dalla funzione evento, altrimenti il numero cambierebbe ad ogni click e il gioco non avrebbe significato)
const secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
document.querySelector('.number').textContent = secretNumber;

let score = 20; // creo variabile score che parte da 20 (punteggio MAX)

document.querySelector('.check').addEventListener('click', function () {
  // console.log(document.querySelector('.guess').value);
  const guess = Number(document.querySelector('.guess').value); // salvo il valore in una variabile chiamata guess
  console.log(typeof guess, guess); // i valori ottenuti dall'UI, in questo caso da un campo input, sono solitamente stringhe per cui dobbiamo trasformarli in numeri

  // Quando non c'è l'input (non viene inserito alcun numero oppure viene inserito 0 che corrisponde a falso)
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ Nessun numero!';

    // Quando il giocatore indovina il numero segreto
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = '🎉 Numero corretto!';

    // Quando il numero è superiore a 20 o minore di 0
  } else if (guess > 20 || guess < 0) {
    document.querySelector('.message').textContent =
      '🚫 Non è un numero compreso tra 1 e 20!';

    // Quando il numero è troppo alto
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Numero troppo alto!';
      score--; // OPPURE score -= 1; OPPURE score = score - 1;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '❌ Hai perso!';
      document.querySelector('.score').textContent = 0;
    }

    // Quando il numero è troppo basso
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        '📉 Numero troppo basso!';
      score--; // OPPURE score -= 1; OPPURE score = score - 1;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '❌ Hai perso!';
      document.querySelector('.score').textContent = 0;
    }
  }
});
