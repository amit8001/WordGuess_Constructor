//defining the constructor function for Letter
function Letter(letter) {
  this.letter = letter;
  this.letterGuessedCorrectly = false;

  this.showCharacter = function() {
    if(!this.letterGuessedCorrectly) {
      return "_";
    } else {
      return this.letter;
    }
  }

  this.guess_correct = function(guess) {
    if(guess === this.letter) {
      this.letterGuessedCorrectly = true;
    }
  }
}

module.exports = Letter;