/* REFERENCES AND TO-DO
To-Do & Extra Features:
- Handle ship stacking						(X)
- Handle repressing 						()
- Handle ship duplication					(X)
- Handle game end							(X)
- Handle game start							(X)
- Handle setting a nonexistent cell			(X)
- Fix round count							(X)
- Delay between hit JN						(X)
- No start until ship placed				(X)
- Handle begin only with ships placed		(X)
- Documentation								()
- Make AI smarter							()
- Generate Computer Ship Randomly			()
*/

// ------------------------------------------------------- Global Variables ------------------------------------------------------- //

round = 1; 															//GLOBAL VARIABLE THAT COUNTS ROUNDS 
shotsHitCom = 0;													//GLOBAL VARIABLE THAT COUNTS COMPUTER HITS
shotsHitHum = 0;													//GLOBAL VARIABLE THAT COUNTS HUMAN HITS
shipsPlacedHum = []; 												//GLOBAL VARIABLE ADDS THE SHIPS PLACED
shotsTakenCom = []; 												//GLOBAL VARIABLE THAT ACCOUNTS FOR THE SHOTS TAKEN FROM THE COMPUTER
shotsTakenHum = []; 												//GLOBAL VARIABLE THAT ACCOUNTS FOR THE SHOTS TAKEN FROM THE HUMAN
letters 	= ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]; 	//GLOBAL VARIABLE TO CONVERT LETTER COLUMN

// ------------------------------------------------------- Functions ------------------------------------------------------- //

function init () { //FUNCTION START THE GAME AND CREATE CALL FOR THE HUMAN OR THE COMPUTER TURN
	if (shipsPlacedHum.length == 5) { 								//IF THE HUMAN HAS PLACED 5 SHIPS, THEN THE GAME CAN BEGIN!
		if (round == 1) {
			alert("The game has begun!");
		}
		if (round % 2 == 0) { 										//THE COMPUTER PLAYS EVERY MOD OF 2 
			computerTurn();											//FUNCTION FOR COMPUTER
		} else if (round == 1) { 									//THE CLICK LISTENER ONLY NEEDS TO RUN AT FIRST ROUND
			humanTurn();											//FUNCTION FOR HUMAN
		}
	} else {
		alert("You have not placed all your ships!"); 				//SHIPS HAVE NOT BEEN PLACED IF SHIP LENGTH DOES NOT EQUAL 5
	}
};

function generateTables () { //FUNCTION THAT CREATES THE TABLES DYNAMICALLY AND ADDS ID!
	var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
	var rowsPlayer = ""; 											//VARIABLE FOR THE ENTIRE TABLE CONTENTS
	var rowsComputer = ""; 											//VARIABLE FOR THE ENTIRE TABLE CONTENTS
	for (var trCtr = 0; trCtr < 11; trCtr++) { 
		rowsPlayer += "<tr>";
		for (var tdCtr = 0; tdCtr < 11; tdCtr++) {
			if ((tdCtr >= 1 && trCtr == 0) || (tdCtr == 0 && trCtr > 0)) {
				if (tdCtr == 0 && trCtr > 0) {
					rowsPlayer += "<th>" + numbers[trCtr - 1] + "</th>";
				} else if (trCtr == 0) {
					rowsPlayer += "<th>" + letters[tdCtr - 1] + "</th>";
				}
			} else {
				rowsPlayer += "<td id=\"" + trCtr + "P" + tdCtr + "\">" + "</td>";
			}
		}
		rowsPlayer += "</tr>";
	}	
	document.getElementById("player").innerHTML = rowsPlayer; 		//INSERT THE ENTIRE CONCATENATED STRING AS AN INNERHTML

	for (var trCtr = 0; trCtr < 11; trCtr++) { 
		rowsComputer += "<tr>";
		for (var tdCtr = 0; tdCtr < 11; tdCtr++) {
			if ((tdCtr >= 1 && trCtr == 0) || (tdCtr == 0 && trCtr > 0)) {
				if (tdCtr == 0 && trCtr > 0) {
					rowsComputer += "<th>" + numbers[trCtr - 1] + "</th>";	
				} else if (trCtr == 0) {
					rowsComputer += "<th>" + letters[tdCtr - 1] + "</th>";
				}
			} else {												//PLAYERCELL CLASS TO SET LISTENER ON IT
				rowsComputer += "<td id=\"" + trCtr + "C" + tdCtr + "\" class=\"PlayerCell\">" + "</td>"; 
			}
		}
		rowsComputer += "</tr>";
	}
	document.getElementById("computer").innerHTML = rowsComputer;
	setComputerShips(); 											//COMPUTER SHIPS ARE STATICALLY GENERATED
};

function setComputerShips () { //FUNCTION THAT SETS THE COMPUTER SHIPS
	var shipSet = ["1C2", "2C2", "3C2", "1C9", "2C9", "4C6", "5C6", "6C6", "7C6", "8C6", "8C4", "8C5", "8C7", "8C8", "10C6", "10C7", "10C8"];
	for (var ctr = 0; ctr < shipSet.length; ctr++) {				//ADDS THE CLASS FOR ENEMY SHIPS TO ALL ARRAY SHIPSET ELEMENTS (SHIPS OF THE COMPUTER)
		document.getElementById(shipSet[ctr]).classList.add("eActiveShip"); //I SHOULD PROBABLY CHANGE THIS TO JQUERY NOTATION
	}
};

function checkPosition (pos) { 															//FUNCTION TO VALIDATE POSITION
	var validateCellCol = letters.indexOf(pos.substring(0,1).toUpperCase()); 			//MAKES THE INPUT UPPERCASE TO HANDLE LOWERCASE INPUTS
	var validateCellRow = Number(pos.substring(1,3)); 									//THE ROW NUMBER
	if (validateCellCol == - 1 || validateCellRow == NaN || validateCellRow >= 11) { 	//HANDLES NON LETTERS FOR COL AND HANDLES NONEXISTENT ROW
		return false;
	} else {
		return true;
	}
};

function checkStacking (shi, ori, spp) { //FUNCTION TO CHECK FOR STACKING: PASSES SHIP (SHI), ORIENTATION (ORI), STARTING POSITION (SPP)
	var cellCol 		= spp.substring(0,1).toUpperCase();
	var cellRow 		= Number(spp.substring(1,3));
	var cellColNumber 	= letters.indexOf(cellCol) + 1;
	var success = true;	//BOOLEAN VALUE TO CHECK IF ANY CELL HAS SOMETHING IN IT TO AVOID STACKING
	if (shi == "cruiser" || shi == "submarine") {
		if (ori == "horizontal" && ((cellColNumber + 2) <= 10)) {
			if($("#" + cellRow + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false;}; //CHECKS IF CLASS LIST CONTAINS ACTIVE SHIP FOR ALL SHIPS AND ALL CELLS AND CHANGES BOOLEAN VALUE TRUE TO FALSE
			if($("#" + cellRow + "P" + (cellColNumber + 1) + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + cellRow + "P" + (cellColNumber + 2) + "")[0].classList.contains("activeShip")) {success = false};
		} else if (ori == "vertical" && ((cellRow + 2) <= 10)) {
			if($("#" + cellRow + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 1) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 2) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};	
		} else {
			alert("That is out of the grid!");
		}
	} else if (shi == "battleship") {
		if (ori == "horizontal" && ((cellColNumber + 3) <= 10)) {
			if($("#" + cellRow + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + cellRow + "P" + (cellColNumber + 1) + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + cellRow + "P" + (cellColNumber + 2) + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + cellRow + "P" + (cellColNumber + 3) + "")[0].classList.contains("activeShip")) {success = false};
		} else if (ori == "vertical" && ((cellRow + 3) <= 10)) {
			if($("#" + cellRow + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 1) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 2) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 3) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
		} else {
			alert("That is out of the grid!");
		}
	} else if (shi == "carrier") {
		if (ori == "horizontal" && ((cellColNumber + 4) <= 10)) {
			if($("#" + cellRow + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + cellRow + "P" + (cellColNumber + 1) + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + cellRow + "P" + (cellColNumber + 2) + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + cellRow + "P" + (cellColNumber + 3) + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + cellRow + "P" + (cellColNumber + 4) + "")[0].classList.contains("activeShip")) {success = false};
		} else if (ori == "vertical" && ((cellRow + 4) <= 10)) {
			if($("#" + cellRow + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 1) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 2) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 3) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
			if($("#" + (cellRow + 4) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};
		} else {
			alert("That is out of the grid!");
		}
	} else {
		if (ori == "horizontal" && ((cellColNumber + 1) <= 10)) {
			if($("#" + cellRow + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};;
			if($("#" + cellRow + "P" + (cellColNumber + 1) + "")[0].classList.contains("activeShip")) {success = false};;
			//shipsPlacedHum.push(ship);
		} else if (ori == "vertical" && ((cellRow + 1) <= 10)) {
			if($("#" + cellRow + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};;
			if($("#" + (cellRow + 1) + "P" + cellColNumber + "")[0].classList.contains("activeShip")) {success = false};;
		} else {
			alert("That is out of the grid!");
		}
	}
	if (success == false) { //REMOVES THE SHIP PLACED IN THE ARRAY IN ORDER TO NOT INTERPRET AS IF THE SHIPS HAS BEEN PLACED
		shipsPlacedHum.pop();
	}
	return success; //SUCCESS RETURNS WITH TRUE OR FALSE TO ACCOMPLISH THE VALIDATION
}; 

function setShip () { //FUNCTION TO SET THE SHIP (CT)
	var ship = $(shipSelection).val();					//GETS SHIP PLACEMENT
	if (checkShipsPlaced(ship)) {						
		//var ship 			= $(shipSelection).val();
		var orientation 	= $(shipOrientation).val(); //GETS ORIENTATION
		var startingPosition= $(startingPoint).val(); 	//GETS STARTINGPOSITION
		if ((ship != "default") && (orientation != "default") && (startingPosition.length <= 3) && (checkPosition(startingPosition)) && (checkStacking(ship, orientation, startingPosition))) { // VALIDATION BEFORE DOING ANYTHING ELSE
			var cellCol 		= startingPosition.substring(0,1).toUpperCase();
			var cellRow 		= Number(startingPosition.substring(1,3));
			var cellColNumber 	= letters.indexOf(cellCol) + 1;
			//var currentIdCell = "#" + cellRow + "P" + cellColNumber + "";
			if (ship == "cruiser" || ship == "submarine") {
				if (orientation == "horizontal" && ((cellColNumber + 2) <= 10)) {
					$("#" + cellRow + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 1) + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 2) + "")[0].classList.add("activeShip");
					//shipsPlacedHum.push(ship);
				} else if (orientation == "vertical" && ((cellRow + 2) <= 10)) {
					$("#" + cellRow + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 1) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 2) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					
				} else {
					shipsPlacedHum.pop();
					alert("That is out of the grid!");
				}
			} else if (ship == "battleship") {
				if (orientation == "horizontal" && ((cellColNumber + 3) <= 10)) {
					$("#" + cellRow + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 1) + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 2) + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 3) + "")[0].classList.add("activeShip");
					//shipsPlacedHum.push(ship);
				} else if (orientation == "vertical" && ((cellRow + 3) <= 10)) {
					$("#" + cellRow + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 1) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 2) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 3) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					//shipsPlacedHum.push(ship);
				} else {
					shipsPlacedHum.pop();
					alert("That is out of the grid!");
				}
			} else if (ship == "carrier") {
				if (orientation == "horizontal" && ((cellColNumber + 4) <= 10)) {
					$("#" + cellRow + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 1) + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 2) + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 3) + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 4) + "")[0].classList.add("activeShip");
					//shipsPlacedHum.push(ship);
				} else if (orientation == "vertical" && ((cellRow + 4) <= 10)) {
					$("#" + cellRow + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 1) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 2) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 3) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 4) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					//shipsPlacedHum.push(ship);
				} else {
					shipsPlacedHum.pop();
					alert("That is out of the grid!");
				}
			} else {
				if (orientation == "horizontal" && ((cellColNumber + 1) <= 10)) {
					$("#" + cellRow + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + cellRow + "P" + (cellColNumber + 1) + "")[0].classList.add("activeShip");
					//shipsPlacedHum.push(ship);
				} else if (orientation == "vertical" && ((cellRow + 1) <= 10)) {
					$("#" + cellRow + "P" + cellColNumber + "")[0].classList.add("activeShip");
					$("#" + (cellRow + 1) + "P" + cellColNumber + "")[0].classList.add("activeShip");
					//shipsPlacedHum.push(ship);
				} else {
					shipsPlacedHum.pop();
					alert("That is out of the grid!");
				}
			} 
		} else {
			alert("Make sure you have selected an orientation, ship, and valid starting position!");
		}
	} else {
		alert("The ship you want to place has already been placed!");
	}
};	

function computerTurn () { //FUNCTION FOR COMPUTER TURN
	setTimeout (function() {												//GIVES TIMEOUT TO ALLOW ROUND TO UPDATE FOR A SECOND AND A HALF
	$("#round").text("Round: " + round);									//UPDATES ROUND FOR COMPUTER TURN
	var randomShotCol = Math.ceil(Math.random() * 10);						//RANDOM SHOT FOR COL
	var randomShotRow = Math.ceil(Math.random() * 10);						//RANDOM SHOT FOR ROW
	var toCheck = $("#" + randomShotRow + "P" + randomShotCol + "")[0];		//CONCATENATES FOR RANDOM SHOT
	if (shotsTakenCom.includes(toCheck)) {									
		init();
	} else {
		shotsTakenCom.push(toCheck);
		if (toCheck.classList.contains("activeShip")) {
			toCheck.classList.remove("activeShip");
			toCheck.classList.add("hitShot");
			toCheck.innerHTML = ("X");
			shotsHitCom++;
			gameOver();
			init();
		} else {
			toCheck.classList.add("missedShot");
			round++;
			//init();
		}
	}
	}, 1500);
};

function humanTurn () { //FUNCTION FOR HUMAN TURN
	$(".PlayerCell").click(function (event) {
		$("#round").text("Round: " + round);
		if(event.currentTarget.classList.contains("eActiveShip")) {
			event.currentTarget.classList.remove("eActiveShip");
			event.currentTarget.classList.add("hitShot");
			event.currentTarget.innerHTML = ("X");
			shotsHitHum++;
			gameOver();
			//init();
		} else {
			event.currentTarget.classList.add("missedShot");
			round++;
			computerTurn();
		}
	});	
};

function checkShipsPlaced (shipToCheck) { //FUNCTION TO CHECK THE SHIPS PLACED
	//var ships = ["cruiser", "submarine", "battleship", "carrier", "destroyer"];
	//for (var ctr = 0; ctr < 5; ctr++) {
		if ((shipsPlacedHum.indexOf(shipToCheck)) == -1) { 	//IF THE SHIP HAS NOT BEEN FOUND IN THE SHIPS PLACED ARRAY, THEN ADD IT AND RETURN TRUE TO CHECK SHIP VALIATION
			shipsPlacedHum.push(shipToCheck);				//ADD THE SHIP TO SHIPSPLACEDHUM ARRAY
			//alert("TRUE");
			return true;
		} else {
			//alert("FALSE");
			return false;
		}
	//}
};

function gameOver () { //FUNCTION FOR GAME END
	if (shotsHitHum == 17 || shotsHitCom == 17) { 	//IF EITHER PLAYER HITS 17 THEN ONE OF THEM WINS
		if (round % 2 == 0) { 						//THE WINNER WILL BE THE CURRENT PLAYER
			var winnerGame = "computer";
			alert("The game is over! The " + winnerGame + " is victorious!");
		} else {
			var winnerGame = "human";
			alert("The game is over! The " + winnerGame + " is victorious!");
		} //IF LENGTH 17 GAME OVER
	}
};

function checkSurroundingCells (row, col) { //DID NOT USE THIS FUNCTION. JUST TESTS
	var s1 = $("#" + (row + 1) + "P" + (col - 1) + "")[0].classList.contains("activeShip");
	var s2 = $("#" + (row + 1) + "P" + (col) + "")[0].classList.contains("activeShip");
	var s3 = $("#" + (row + 1) + "P" + (col + 1) + "")[0].classList.contains("activeShip");
	var s4 = $("#" + (row) + "P" + (col - 1) + "")[0].classList.contains("activeShip");
	var s5 = $("#" + (row) + "P" + (col + 1) + "")[0].classList.contains("activeShip");
	var s6 = $("#" + (row - 1) + "P" + (col - 1) + "")[0].classList.contains("activeShip");
	var s7 = $("#" + (row - 1) + "P" + (col) + "")[0].classList.contains("activeShip");
	var s8 = $("#" + (row - 1) + "P" + (col + 1) + "")[0].classList.contains("activeShip");
	var arraySurrounding = [];
	arraySurrounding.push(s1);
	arraySurrounding.push(s2);
	arraySurrounding.push(s3);
	arraySurrounding.push(s4);
	arraySurrounding.push(s5);
	arraySurrounding.push(s6);
	arraySurrounding.push(s7);
	arraySurrounding.push(s8);
	if (arraySurrounding.includes(true)) {
		return false;
	} else {
		return true;
	}
};