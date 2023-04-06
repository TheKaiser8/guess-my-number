'use strict';

// creo il numero segreto casuale da indovinare (fuori dalla funzione evento, altrimenti il numero cambierebbe ad ogni click e il gioco non avrebbe significato)
let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20; // creo variabile score che parte da 20 (punteggio MAX)
let highscore = 0; // creo variabile highscore che parte da 0

// creo funzione per non duplicare codice della visualizzazione messaggio
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// creo funzione per non duplicare codice della visualizzazione score
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

// creo funzione per non duplicare codice del colore di background del body
const displayBgBody = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

// creo variabile per non duplicare codice per la selezione della classe .number
const displayNumber = document.querySelector('.number');

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value); // salvo il valore in una variabile chiamata guess
  console.log(typeof guess, guess); // i valori ottenuti dall'UI, in questo caso da un campo input, sono solitamente stringhe per cui dobbiamo trasformarli in numeri

  // Quando non c'è l'input (non viene inserito alcun numero oppure viene inserito 0 che corrisponde a falso)
  if (!guess) {
    displayMessage('⛔ Nessun numero!');

    // Quando il giocatore indovina il numero segreto
  } else if (guess === secretNumber) {
    displayMessage('🎉 Numero corretto!');
    displayBgBody('#60b347'); // cambio il colore di sfondo
    displayNumber.textContent = secretNumber; // svelo il numero nel container solamente quando il giocatore indovina
    displayNumber.style.width = '30rem'; // cambio la larghezza del container del numero segreto

    // controllo highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // Quando il numero è superiore a 20 o minore di 0
  } else if (guess > 20 || guess < 0) {
    displayMessage('🚫 Non è un numero compreso tra 1 e 20!');

    // Quando il numero NON è indovinato
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(
        guess > secretNumber
          ? '📈 Numero troppo alto!'
          : '📉 Numero troppo basso!'
      );
      score--; // OPPURE score -= 1; OPPURE score = score - 1;
      displayScore(score);
    } else {
      displayMessage('❌ Hai perso!');
      displayScore(0);
    }
  }
});

// Implemento funzionalità per resettare il gioco cliccando sul tasto "Riprova!"
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1; // genero nuovo numero segreto
  score = 20; // ripristino punteggio iniziale

  displayScore(score); // punteggio
  displayMessage('Inizia a indovinare...'); // messaggio
  document.querySelector('.guess').value = ''; // valore input
  displayBgBody('#222'); // colore sfondo
  displayNumber.textContent = '?'; // container numero segreto
  displayNumber.style.width = '15rem'; // larghezza container numero segreto
});
