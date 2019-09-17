/*
Pick a random number from x to y (student choice) that hasn’t been used before (X)
Display instructions on the page (X)
Read a value from a text input box (X)
Validate that the value is a number (X)
Compare the chosen value to the selected random value (X)
Report whether the chosen value is too high or too low or correct (X)
Continue until the correct number is chosen (X)
Add the random number to a drop down list of previous random numbers (X)
Offer an option to play again (X)
Be well documented (X)
*/

numbersUtilized = []; //ARRAY FOR VALUES ALREADY GENERATED. DECLEARED OUTSIDE FOR PERSISTENCE

function setNumberRange () { //FUNCTION TO SET THE NUMBER RANGE
	var minNumber = Number(document.getElementById("randomNumberMin").value);//GETS VALUES FROM BOXES
	var maxNumber = Number(document.getElementById("randomNumberMax").value);
	randomNumber(minNumber, maxNumber); //REFERS TO FUNCTION BELOW IN ORDER TO GENERATE VALUE IN THAT RANGE! //https://stackoverflow.com/questions/407048/accessing-variables-from-other-functions-without-using-global-variables
	setDisplay(minNumber, maxNumber); //REFERS TO THE FUNCTION TWO SPACES BELOW WHICH SETS THE DISPLAY OR VISUAL NUMBERS
	document.getElementById("guessInput").focus();
}

function randomNumber (minNumber, maxNumber) { //FUNCTION THAT GENERATES RANDOM NUMBER FROM PREVIOUS PARAMS
	selectedNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber; //GENERATES VALUE FROM RANGE //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
	if(numbersUtilized.includes(selectedNumber)){ //IF STATEMENT TO NEGATE VALUES IN THAT ARE ALREADY IN THE NUMBERSGENERATED ARRAY //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
		var minNumber = Number(document.getElementById("randomNumberMin").value); //RE-READS MIN AND MAX, THEN GENERATES NEW RANDOM NUMBER
		var maxNumber = Number(document.getElementById("randomNumberMax").value);
		randomNumber(minNumber, maxNumber)
	}
	console.log(selectedNumber); //VISUAL AID IN CONSOLE! DEBUGGING PURPOSES!
	return selectedNumber; //https://stackoverflow.com/questions/27887884/how-to-make-a-local-variable-into-global-javascript
}

function setDisplay (minNumber, maxNumber) { //SETS THE VISUAL VALUES OF MIN AND MAX
	document.getElementById("minBoxDisplay").innerHTML += " " + minNumber + " "; //https://stackoverflow.com/questions/13495010/how-to-add-content-to-html-body-using-js
	document.getElementById("maxBoxDisplay").innerHTML += " " + maxNumber + " ";
}

function guessedNumber () { //RUNS WHEN GUESS BUTTON IS PRESSED. CHECKS VALUE AND SENDS TO VALIDATE
	userGuess = Number(document.getElementById("guessInput").value);
	validate(userGuess); //CALLS THE VALIDATE FUNCTION WITH USERGUESS AS PARAMS
	/*guess = document.getElementById("guessInput").value; //TESTS FOR FUTURE PURPOSES
	//if(Number(guess) === NaN){ //https://www.w3schools.com/jsref/jsref_number.asp
	//	alert("NOT A NUMBER"); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
	//	return;
	//}*/
}

function validate (userGuess) { //FUNCTION CHECKS TO SEE IF GUESSED NUMBERS IS CORRECT
	if(userGuess > selectedNumber) { //USES SIMPLE IF STATEMENT
		alert("YOU'RE OVER"); //USED ALERTS TO CHANGE THINGS UP
		document.getElementById("guessInput").value = ""; //CLEARS VALUE FOR EASE OF ENTERING NUMBERS
		document.getElementById("guessInput").focus(); //Takes back to the text-box //https://www.w3schools.com/jsref/met_html_focus.asp
	} else if (userGuess < selectedNumber) {
		alert("YOU'RE UNDER");
		document.getElementById("guessInput").value = "";
		document.getElementById("guessInput").focus();
	} else if (userGuess === selectedNumber) {
		addToRandomList(selectedNumber); //CALLS FUNCTION TO ADD NUMBER GENERATED TO THE ARRAY! THIS OCCURS ONCE USER WINS
		playAgain(); //CALLS PLAYAGAIN FUNCTION TO RESTART THE GAME AND DECLARE VICTORY
	} else { //IF NONE OF THE PREVIOUS OCCUR, THEN IT IS NOT A NUMBER. (GOT THIS SIMPLE METHOD FROM RYAN L APPROACH WHILE I WAS HELPING HIM ON THE PROJECT)
		alert("THAT IS NOT A NUMBER");
	}
}
/*function validatee (userGuess) { //TEST VALIDATEE FOR FUTURE PURPOSES
	if(userGuess > selectedNumber) {
		alert("TOO HIGH");
		document.getElementById("guessInput").value = "";
	} else if (userGuess < selectedNumber) {
		alert("TOO LOW");
		document.getElementById("guessInput").value = "";
	} else {
		addToRandomList(selectedNumber);
		playAgain();
	}
}
*/
function addToRandomList(selectedNumber) { //ADDS SELECTED VALUE TO ARRAY WHEN USER WINS
	numbersUtilized.push(selectedNumber); //PUSH METHOD TO ADD VALUE
	document.getElementById("usedBoxDisplay").innerHTML += " " + selectedNumber + " "; //SETS THE NUMBERS VISUALLY. COULD ALSO USE AN ARRAY and SLICE AS BELOW
	//document.getElementById("usedBoxDisplay").innerHTML = numbersUtilized.slice(0, numbersUtilized.length); //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
}

function playAgain(){ //FUNCTION TO END THE GAME AND/OR RESTART
	alert("YOU'RE GOLDEN! YOU WON THE GAME WITH THE NUMBER" + " \"" + selectedNumber + "\""); //ALERTS USER ABOUT VICTORY
	var play = confirm("Play Again?"); //CONFIRMS IF THEY DESIRE TO PLAY AGAIN //https://www.w3schools.com/jsref/met_win_confirm.asp
	if(play){
		alert("LETS DO IT!"); //LETS DO IT MESSAGE :D
		document.getElementById("randomNumberMin").value = ""; //CLEARS VALUES FROM BOXES
		document.getElementById("randomNumberMax").value = ""; //CLEARS VALUES FROM BOXES
		document.getElementById("guessInput").value = ""; //CLEARS VALUES FROM BOXES
		document.getElementById("randomNumberMin").focus();
	} else {
		alert("HOPE YOU ENJOYED THE GAME!"); //IF BOOLEAN RETURNS FALSE (CONFIRM = CANCEL) THEN A GOODBYE MESSAGE DISPLAYS
	}
}