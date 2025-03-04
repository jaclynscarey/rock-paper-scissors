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

function userChooses(e){
  const buttonId = e.target.id;
  if (buttonId == 'lapis'){
    player.choice = options[0];
  } else if (buttonId == 'papyrus'){
    player.choice = options[1];
  } else if (buttonId == 'scalpellus'){
    player.choice = options[2];
  }
  compareChoices();
}


//-----------Var Inits--------------
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
cx = ctx.canvas.width / 2;
cy = ctx.canvas.height / 2;

let confetti = [];
const confettiCount = 300;
const gravity = 0.5;
const terminalVelocity = 5;
const drag = 0.075;
const colors = [
{ front: 'red', back: 'darkred' },
{ front: 'green', back: 'darkgreen' },
{ front: 'blue', back: 'darkblue' },
{ front: 'yellow', back: 'darkyellow' },
{ front: 'orange', back: 'darkorange' },
{ front: 'pink', back: 'darkpink' },
{ front: 'purple', back: 'darkpurple' },
{ front: 'turquoise', back: 'darkturquoise' }];


//-----------Functions--------------
resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cx = ctx.canvas.width / 2;
  cy = ctx.canvas.height / 2;
};

randomRange = (min, max) => Math.random() * (max - min) + min;

initConfetti = () => {
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      color: colors[Math.floor(randomRange(0, colors.length))],
      dimensions: {
        x: randomRange(10, 20),
        y: randomRange(10, 30) },

      position: {
        x: randomRange(0, canvas.width),
        y: canvas.height - 1 },

      rotation: randomRange(0, 2 * Math.PI),
      scale: {
        x: 1,
        y: 1 },

      velocity: {
        x: randomRange(-25, 25),
        y: randomRange(0, -50) } });


  }
};

//---------Render-----------
render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confetti.forEach((confetto, index) => {
    let width = confetto.dimensions.x * confetto.scale.x;
    let height = confetto.dimensions.y * confetto.scale.y;

    // Move canvas to position and rotate
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);

    // Apply forces to velocity
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
    confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // Set position
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;

    // Delete confetti when out of frame
    if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

    // Loop confetto x position
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;

    // Spin confetto by scaling y
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

    // Draw confetti
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Reset transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  });

  // Fire off another round of confetti
  //if (confetti.length <= 10) initConfetti();

  window.requestAnimationFrame(render);
};


document.querySelector('#lapis').addEventListener('click', userChooses);
document.querySelector('#papyrus').addEventListener('click', userChooses);
document.querySelector('#scalpellus').addEventListener('click', userChooses);

function compareChoices(){
  computerChooses();
if (computer.choice == player.choice){
  player.score++;
  computer.score++;
  document.querySelector('.result').innerHTML = "It's a tie, the computer and " + player.name + " chose " + computer.choice + ".";
  document.querySelector('#player-score').innerHTML = player.score;
  document.querySelector('#computer-score').innerHTML = computer.score;

} else if (computer.choice == options[0]){
  if (player.choice == options[1]){
    player.score++;
    document.querySelector('.result').innerHTML = player.name + " wins! " + player.name + " chose " + options[1] + " and the computer chose " + options[0] + "."; 
    document.querySelector('#player-score').innerHTML = player.score;
    initConfetti();
    render();
  } else {
    computer.score++;
    document.querySelector('.result').innerHTML = "The computer wins! The computer chose " + options[0] + " and " + player.name + " chose " + options[2] + "."; 
    document.querySelector('#computer-score').innerHTML = computer.score;
  }

} else if (computer.choice == options[1]){
  if (player.choice == options[2]){
    player.score++;
    document.querySelector('.result').innerHTML = player.name + " wins! " + player.name + " chose " + options[2] + " and the computer chose " + options[1] + "."; 
    document.querySelector('#player-score').innerHTML = player.score;
    initConfetti();
    render();
  } else {
    computer.score++;
    document.querySelector('.result').innerHTML ="The computer wins! The computer chose " + options[1] + " and " + player.name + " chose " + options[0] + "."; 
    document.querySelector('#computer-score').innerHTML = computer.score;
  }

} else if (computer.choice == options[2]){
  if (player.choice == options[0]){
    player.score++;
    document.querySelector('.result').innerHTML =player.name + " wins! " + player.name + " chose " + options[0] + " and the computer chose " + options[2] + "."; 
    document.querySelector('#player-score').innerHTML = player.score;
    initConfetti();
    render();
  } else if (player.choice == options[1]){
    computer.score++;
    document.querySelector('.result').innerHTML ="The computer wins! The computer chose " + options[2] + " and " + player.name + " chose " + options[1] + ".";
    document.querySelector('#computer-score').innerHTML = computer.score;
  }
}
}