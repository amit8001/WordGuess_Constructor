const Word = require("./word.js");
const inquirer = require("inquirer");

const wordBank = ["food", "pizza", "happy", "joy", "omlette", "rice", "tacos", "pasta", "burrito",
    "sandwich", "yogurt", "smoothie", "mango", "fruit", "tomato", "healthy", "meal"
];

let guesses;
let pickedWords;
let word;
let pickedWord;

var ctr = 0;
let letters_in_checker = [];

function on_Load() {
    pickedWords = [];
    console.log("Welcome to guesses in Food related words!!");
    console.log("------------------------------------------");
    playGame();
}

function playGame() {
    pickedWord = "";
    guesses = 15;
    if (pickedWords.length < wordBank.length) {
        pickedWord = getWord();
    } else {
        // WIN CONDITION
        console.log("Bravo! you guessed it all!!");
        continuePrompt();
    }
    if (pickedWord) {
        word = new Word(pickedWord);
        word.generateLetters();
        //setting these 2 values to 0 and empty before makeGuess is called
        ctr = 0;
        letters_in_checker = [];
        makeGuess();
    }
}

function getWord() {
    let rand = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[rand];
    console.log(randomWord);

    //to ensure unqiue word shown to user
    if (pickedWords.indexOf(randomWord) === -1) {
        pickedWords.push(randomWord);
        return randomWord;
    } else {
        return getWord();
    }
}


function makeGuess() {
    let checker = [];


    inquirer.prompt([{
            name: "guessedLetter",
            message: word.showWord() +
                "\nGuess a letter!" +
                "\nGuesses Left: " + guesses
        }])
        .then(data => {
            // console.log("Letters already guessed: "+ letters_in_checker);
            console.log("Letters already guessed initial: " + letters_in_checker);
            console.log(data.guessedLetter);
            if (ctr > 0 && letters_in_checker.indexOf(data.guessedLetter) >= 0) {
                console.log("You already guessed this letter and so you are not dinged for number of guesses left!")
            } else {
                guesses--;
            }
            //VERY IMP code block in this for loop 
            //This calls the checkLetter method for each letter object and passes the letter that user keys in
            //if that value matches the letter object's letter property then a boolean variable is set to true and then the getcharacter() method
            //of the letter object is called.
            for (var i = 0; i < word.letters.length; i++) {
                //word.letters[i].guess_correct(data.guessedLetter);
                word.Guess(data.guessedLetter);
                checker.push(word.letters[i].showCharacter());
            }

            function checkUnderscr(und) {
                return und != "_";
            }

            letters_in_checker = checker.filter(checkUnderscr);


            // console.log("********" + checker);
            // console.log("******guessed letter=" + data.guessedLetter);
            // console.log("******" + checker.indexOf(data.guessedLetter));

            // console.log("Letters already guessed: " + letters_in_checker);
            // console.log("ctr= " + ctr);



            if (guesses > 0 && checker.indexOf("_") !== -1) {
                ctr++;
            //    console.log("updated ctr***" + ctr);
                 makeGuess();
            }
             else if (guesses === 0) {
                    console.log("You ran out of guesses! GAME OVER.");
                    continuePrompt();
                } 
                
            else {
                console.log("CONGRATULATIONS! You guessed the word correctly!");
                console.log(word.showWord());
                playGame();
            }


        });
}

function continuePrompt() {
    inquirer.prompt([{
            name: "continue",
            type: "list",
            message: "Would you like to play again?",
            choices: ["Yes", "No"]
        }])
        .then(data => {
            if (data.continue === "Yes") {
                on_Load();
            } else {
                console.log("Thanks for playing this game!");
            }
        });
}

on_Load();