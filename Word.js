//require letter.js to use the Letter constructor function
var Letter = require("./letter.js");

//defining the Word constructor function
function Word(word) {
  this.word = word;
  this.letters = [];

  //this function splits the word when created of type Word, into letters and each letter in that word becomes a new Letter object
  // and it has access to the properties and methods defined in the letter object
  //we also push those letter objects to an array.
  this.generateLetters = function() {
    let wordArr = this.word.split("");
    for(let i = 0; i < wordArr.length; i++) {
      let newLetter = new Letter(wordArr[i]);
      this.letters.push(newLetter);
    }
  }


  //In this function for each of those letter objects in that array populated from above, 
  //we call guess_correct function by passing a "letter" as an argument.
  //So in word PASTA, this becomes like this.letters array becomes [{P object},{A object},{S object},{T object},{A object}]
  this.Guess = function(guess) {
    for (var i= 0; i<this.letters.length; i++){
      //the below line compares the letter passed by user say e.g. "A" to the this.letter property for that letter object,
      //(in our case this.letter for "P object" is "P"). 
      // As this is in a for loop, it loops through every letter object (starting with "P object")in that word and compares 
        this.letters[i].guess_correct(guess);
    }

  }

  //function to show word
  this.showWord = function() {
    let printedWord = "";
    this.letters.forEach(letter => {
      printedWord += letter.showCharacter() + " ";
    });
    return printedWord;
  }
}

module.exports = Word;