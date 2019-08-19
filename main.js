//When window loads action this function
window.onload = () => getRandomIntInclusive(1, 10);

//Get required elements
const attemptsSpan = document.querySelector('.count');
const guessButton = document.querySelector('.submit');
const input = document.querySelector('input');
const message = document.querySelector('.message p');
const attemptsRecord = document.querySelector('.attemptsRecord span');
const playAgain = document.querySelector('.playAgain');

//Initialize variables
let count = 3;
let numberToGuess = 0;

const messsagesArr = [
  '',
  'Guess again',
  'Try again',
  'Nope',
  'Try harder',
  'Incorrect',
  'Keep going',
  'Wrong answer',
  'That was close',
  'Next time',
  "Don't give up"
];

//Show attempts counter and disable play again button
attemptsSpan.textContent = `${count}`;
playAgain.disabled = true;
playAgain.style = 'opacity: 0.3; cursor: none';

//This function returns a random number from 1 to 10. It is called from the HTMl
//body tag onLoad method. This means it only runs everytime we reload.
const getRandomIntInclusive = (min, max) => {
  input.focus();
  min = Math.ceil(min);
  max = Math.floor(max);
  numberToGuess = Math.floor(Math.random() * (max - min + 1)) + min;
  return numberToGuess;
};

//The guess functionality.
const guessingGame = guess => {
  guess = parseInt(guess);
  input.focus();
  input.value = '';
  message.textContent = '';
  count--; //Everytime the guess button is activated we decrement the attempts counter
  attemptsSpan.textContent = `${count}`;
  console.log(numberToGuess);

  //If the number is valid we add it to the attempts recorder
  if (Number.isInteger(guess) && guess >= 1 && guess <= 10) {
    attemptsRecord.textContent += `  ${guess}`;
  }

  //Check for an actual number
  if (isNaN(guess)) {
    message.textContent = 'Please enter a correct number';
    count++;
  }

  //Check to see if the number is within range
  if (guess < 1 || guess > 10) {
    message.textContent = 'Please enter a number between 1 and 10';
    count++;
  }

  //You guessed wrong so tell the user. I have different messages available for each number entered
  if (
    guess !== numberToGuess &&
    Number.isInteger(guess) &&
    guess >= 1 &&
    guess <= 10
  ) {
    message.textContent = `${messsagesArr[guess]}`;
  }

  //The correct guess was entered. Send the message and disable the guess button and activate the play again button
  if (guess === numberToGuess) {
    message.textContent = `You guessed ${numberToGuess} correctly in ${3 -
      count} attempts. You are a winner`;
    input.value = numberToGuess;
    input.style = 'color: #139c07';
    guessButton.style = 'opacity: 0.3; cursor: none';
    guessButton.disabled = true;
    playAgain.disabled = false;
    playAgain.style = 'opacity: 1';
    playAgain.focus();
  }

  //Check if the attemts have been exceeded. If so send message, disable guess button and activate play again button
  if (count < 1 && guess !== numberToGuess) {
    message.textContent =
      'You are out of luck buddy. You have exceeded your limit';
    input.value = numberToGuess;
    input.style = 'color: #139c07';
    guessButton.style = 'opacity: 0.3; cursor: none';
    guessButton.disabled = true;
    playAgain.disabled = false;
    playAgain.style = 'opacity: 1';
    playAgain.focus();
  }
};

//Check for guess button clicks
guessButton.addEventListener('click', e => {
  e.preventDefault();
  guessingGame(input.value);
});

//Check for enter key
input.addEventListener('keypress', e => {
  if (e.which === 13) {
    e.preventDefault();
    guessButton.click();
  }
});

//Check for play again. If clicked or enter pressed reload which will rerun the random number function.
playAgain.addEventListener('click', () => window.location.reload());
