const player = {
  name: "The Player",
  choice: null,
  score: 0
};
const computer = {
  choice: null,
  score: 0
};
const options = ["Rock", "Paper", "Scissors"];

function setPlayerName() {
  player.name = document.querySelector('input').value;
  document.querySelector('#player-name').innerHTML = player.name;
}

function reset() {
  player.name = "Player";
  document.querySelector('input').value = null;
  player.score = 0;
  computer.score = 0;
  document.querySelector('#player-name').innerHTML = player.name;
  document.querySelector('#player-score').innerHTML = player.score;
  document.querySelector('#computer-score').innerHTML = computer.score;
  document.querySelector('.result').innerHTML = "The winner is...";
}

document.getElementById('start').addEventListener('click', setPlayerName);
document.getElementById('reset').addEventListener('click', reset);

function computerChooses() {
  const randomIndex = Math.floor(Math.random() * options.length);
  computer.choice = options[randomIndex];
}

function userChooses(e) {
  const buttonId = e.target.id;
  if (buttonId == 'lapis') {
    player.choice = options[0];
  } else if (buttonId == 'papyrus') {
    player.choice = options[1];
  } else if (buttonId == 'scalpellus') {
    player.choice = options[2];
  }
  compareChoices();
}

document.querySelector('#lapis').addEventListener('click', userChooses);
document.querySelector('#papyrus').addEventListener('click', userChooses);
document.querySelector('#scalpellus').addEventListener('click', userChooses);

function compareChoices() {
  computerChooses();
  if (computer.choice == player.choice) {
    player.score++;
    computer.score++;
    document.querySelector('.result').innerHTML = "It's a tie, the computer and " + player.name + " chose " + computer.choice + ".";
    document.querySelector('#player-score').innerHTML = player.score;
    document.querySelector('#computer-score').innerHTML = computer.score;

  } else if (computer.choice == options[0]) {
    if (player.choice == options[1]) {
      player.score++;
      document.querySelector('.result').innerHTML = player.name + " wins! " + player.name + " chose " + options[1] + " and the computer chose " + options[0] + ".";
      document.querySelector('#player-score').innerHTML = player.score;
    } else {
      computer.score++;
      document.querySelector('.result').innerHTML = "The computer wins! The computer chose " + options[0] + " and " + player.name + " chose " + options[2] + ".";
      document.querySelector('#computer-score').innerHTML = computer.score;
    }

  } else if (computer.choice == options[1]) {
    if (player.choice == options[2]) {
      player.score++;
      document.querySelector('.result').innerHTML = player.name + " wins! " + player.name + " chose " + options[2] + " and the computer chose " + options[1] + ".";
      document.querySelector('#player-score').innerHTML = player.score;
    } else {
      computer.score++;
      document.querySelector('.result').innerHTML = "The computer wins! The computer chose " + options[1] + " and " + player.name + " chose " + options[0] + ".";
      document.querySelector('#computer-score').innerHTML = computer.score;
    }

  } else if (computer.choice == options[2]) {
    if (player.choice == options[0]) {
      player.score++;
      document.querySelector('.result').innerHTML = player.name + " wins! " + player.name + " chose " + options[0] + " and the computer chose " + options[2] + ".";
      document.querySelector('#player-score').innerHTML = player.score;
    } else if (player.choice == options[1]) {
      computer.score++;
      document.querySelector('.result').innerHTML = "The computer wins! The computer chose " + options[2] + " and " + player.name + " chose " + options[1] + ".";
      document.querySelector('#computer-score').innerHTML = computer.score;
    }
  }
}