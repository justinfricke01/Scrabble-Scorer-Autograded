// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let initialWord = "";

function initialPrompt() {
   console.log("Let's play some scrabble!" + "\n");
   initialWord = input.question("Enter a word to score: ")
   console.log(oldScrabbleScorer(initialWord));
};
let simpleScorer = function (word) {
   let score = 0
   for (let i = 0; i < word.length; i ++){
     score += 1
   }
   return score
 };
 
 let vowelBonusScorer = function(word){
   word = word.toUpperCase();
   let score = 0
   for (let i = 0; i < word.length; i ++){
     if (
     word[i] === "A" || 
     word[i] === "E" || 
     word[i] === "I" || 
     word[i] === "O" || 
     word[i] === "U" ){
       score += 3
     } else {
       score += 1
     }
   }
   return score
 };
 
 let scrabbleScorer = function (word) {
    word = word.toLowerCase();
    let letterPoints = 0;
    for (let i = 0; i < word.length; i++) {
     for (item in newPointStructure) {
       if (item === word[i]){
        letterPoints += newPointStructure[item]
       }
      }
    }
    return letterPoints;
  };

  // 3 objects
 let simpleScoreObj =  { 
 description: 'Each letter is worth 1 point.',
 name: 'Simple Score', 
 scorerFunction: simpleScorer };

 let vowelBonusObj = { 
 description: 'Vowels are 3 pts, consonants are 1 pt.', 
 name: 'Bonus Vowels',
 scorerFunction: vowelBonusScorer };

 let scrabbleScoreObj = { 
 description: 'The traditional scoring algorithm.',
 name: 'Scrabble', 
 scorerFunction: scrabbleScorer };



 const scoringAlgorithms = [simpleScoreObj, vowelBonusObj, scrabbleScoreObj]
 
 function scorerPrompt(word) {
    let algorithm = input.question("Which scoring algorithm would you like to use?" + "\n" + "0 - Simple: One point per character" + "\n" + "1 - Vowel Bonus: Vowels are worth 3 points" + "\n" + "2 - Scrabble: Uses scrabble point system" + "\n" + "Enter 0, 1, or 2: ")
    console.log("algorithm name: ", scoringAlgorithms[algorithm].name);
    console.log("scorerFunction result: ", scoringAlgorithms[algorithm].scorerFunction(initialWord));
 };
 function transform(object) {
   let newObject = {}
   for (item in object){
     for (i = 0; i < object[item].length; i ++){
      let newLetterKey = object[item][i];
      newLetterKey = newLetterKey.toLowerCase();
      newObject[newLetterKey] = Number(item);
     }
   }
   return newObject
 };
 
let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
