const player = {
  choice: null
};
const computer = {
  choice: null
};
const options = ["Rock", "Paper", "Scissors"];

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

document.querySelector('#lapis').addEventListener('click', userChooses);
document.querySelector('#papyrus').addEventListener('click', userChooses);
document.querySelector('#scalpellus').addEventListener('click', userChooses);

function compareChoices(){
  computerChooses();
if (computer.choice == player.choice){
  document.querySelector('.result').innerHTML = "It's a tie, the computer and the player chose " + computer.choice + ".";

} else if (computer.choice == options[0]){
  if (player.choice == options[1]){
    document.querySelector('.result').innerHTML = "The player wins! The player chose " + options[1] + " and the computer chose " + options[0] + "."; 
  } else {
    document.querySelector('.result').innerHTML = "The computer wins! The computer chose " + options[0] + " and the player chose " + options[2] + "."; 
  }

} else if (computer.choice == options[1]){
  if (player.choice == options[2]){
    document.querySelector('.result').innerHTML ="The player wins! The player chose " + options[2] + " and the computer chose " + options[1] + "."; 
  } else {
    document.querySelector('.result').innerHTML ="The computer wins! The computer chose " + options[1] + " and the player chose " + options[0] + "."; 
  }

} else if (computer.choice == options[2]){
  if (player.choice == options[0]){
    document.querySelector('.result').innerHTML ="The player wins! The player chose " + options[0] + " and the computer chose " + options[2] + "."; 
  } else if (player.choice == options[1]){
    document.querySelector('.result').innerHTML ="The computer wins! The computer chose " + options[2] + " and the player chose " + options[1] + ".";
  }
}
}