/* SETUP
	-Draw Table 					(X)
	-Setting Seed Pattern 			(X)
	-Initializing Internal Array 	(X)
	-Set Interval or Button 		(X)
*/

/* LOOPS/ROUNDS
	-Copy current state to new Array 				(X)
	-For every row, for every column 				(X)
		*Should the cell become alive or dead		(X)
		*Update new array 							(X)
	-Copy new array to current state and <table> 	(X)
*/

/* OWNERSHIP
	-MIGUEL TAPIA
*/

function generateTable () {
	functionCalls = 0; 
	var rows = "";
	for (var trCtr = 0; trCtr < 32; trCtr++) { 
		rows += "<tr>";
		for (var tdCtr = 0; tdCtr < 32; tdCtr++) {
			rows += "<td id=\"" + trCtr + "M" + tdCtr + "\">" + "</td>";
		}
		rows += "</tr>";
	}	
	document.getElementById("main").innerHTML = rows;
	mainArray = [];
	for (var trCtr = 0; trCtr < 32; trCtr++) {
		mainArray.push([]);
		for (var tdCtr = 0; tdCtr < 32; tdCtr++) {
			mainArray[trCtr].push(trCtr + "M" + tdCtr);
		}
	}
}

function selectedSeed (seed) {
	switch (seed) { // Switch statement to call functions according to the seed and clearing the cells
		case "oSeed":
			clearCells();
			originalSeed();
			break;
		case "glider":
			clearCells();
			gliderSeed();
			break;
		case "exploder":
			clearCells();
			exploderSeed();
			break;
		case "tenCellRow":
			clearCells();
			tenCellRowSeed();
			break;
		case "spaceship": 
			clearCells();
			spaceshipSeed();
			break;
		case "tumbler": 
			clearCells();
			tumblerSeed();
			break;
		case "personal": 
			clearCells();
			personalSeed();
			break;
		default:
			clearCells();
			alert("PLEASE CHOOSE A SEED");
	}
}

function fill (arr) {
	for (var ctr = 0; ctr < arr.length; ctr++) {
		document.getElementById(arr[ctr]).classList.toggle("aliveCell");
	}
}

function originalSeed () {
	var originalSeedArray = ["15M15", "14M14", "15M16", "14M15"];
	fill(originalSeedArray);
}

function personalSeed () {
	var personalSeedArray = [];
	var setCells = [10, 11, 12, 14, 15, 16, 18, 19, 20];
	for (var trCtr = 14; trCtr < 17; trCtr++) {
		for (var setCellCtr = 0; setCellCtr < 9; setCellCtr++) {
			personalSeedArray.push(trCtr + "M" + setCells[setCellCtr]);
		}
	}	
	fill(personalSeedArray);
}

function gliderSeed () {
	var gliderSeedArray = ["16M14", "16M15", "16M16", "14M15", "15M16"];
	fill(gliderSeedArray);
}

function exploderSeed () {
	var exploderSeedArray = ["15M13", "14M13", "13M13", "16M13", "17M13", "13M15", "17M15", "15M17", "14M17", "13M17", "16M17", "17M17"];
	fill(exploderSeedArray);
}

function tenCellRowSeed () {
	var tenCellRowSeedArray = ["15M11", "15M12", "15M13", "15M14", "15M15", "15M16", "15M18", "15M17", "15M19", "15M20"];
	fill(tenCellRowSeedArray);
}

function spaceshipSeed () {
	var spaceshipSeedArray = ["15M17", "14M17", "13M17", "13M15", "13M16", "14M13", "16M13", "16M16", "13M14"];
	fill(spaceshipSeedArray);
}

function tumblerSeed () {
	var tumblerSeed = ["13M13", "13M14", "13M16", "13M17", "14M13", "14M14", "14M16", "14M17", "15M14", "15M16", "16M14", "16M16", "17M14", "17M16", "18M13", "18M12", "17M12", "16M12", "18M17", "18M18", "17M18", "16M18"];
	fill(tumblerSeed);
}

function clearCells () {
	for (var trCtr = 0; trCtr < 32; trCtr++) {
		for (var tdCtr = 0; tdCtr < 32; tdCtr++) {	
			document.getElementById(mainArray[trCtr][tdCtr]).classList.remove("aliveCell");
		}
	}
}

function checkStates () {
	functionCalls++; // In order to have an iteration counter
	document.getElementById("roundCount").innerHTML = functionCalls;
	var aliveCellCol = document.getElementsByClassName("aliveCell");
	aliveCells = [];
	for (var colCtr = 0; colCtr < aliveCellCol.length; colCtr++) { //https://hackernoon.com/htmlcollection-nodelist-and-array-of-objects-da42737181f9
		aliveCells.push(aliveCellCol[colCtr].id);
	}
	for (var trCtr = 0; trCtr < 32; trCtr++) {
		for (var tdCtr = 0; tdCtr < 32; tdCtr++) {
			var currentCell = mainArray[trCtr][tdCtr];	
			surrounding(currentCell, trCtr, tdCtr);
		}
	}
}

function surrounding (current, tRow, tData) {
	var eN0, eN1, eN2, eN3, eN4, eN5, eN6, eN7;
	if (tRow > 0 && tData > 0) eN0 = mainArray[tRow - 1][tData -1]; 
	if (tRow > 0) eN1 = mainArray[tRow - 1][tData];
	if (tRow > 0 && tData < 31) eN2 = mainArray[tRow - 1][tData + 1];
	if (tData > 0) eN3 = mainArray[tRow][tData - 1];
	if (tData < 31) eN4 = mainArray[tRow][tData + 1];
	if (tRow < 31 && tData > 0) eN5 = mainArray[tRow + 1][tData - 1];
	if (tRow < 31) eN6 = mainArray[tRow + 1][tData];
	if (tRow < 31 && tData < 31) eN7 = mainArray[tRow + 1][tData + 1];
		
	var surroundingArray = [eN0, eN1, eN2, eN3, eN4, eN5, eN6, eN7];

	var intersectionArrays = _.intersection(aliveCells, surroundingArray); //contains itself https://underscorejs.org/#arrays
		
	var aliveNeighbors = intersectionArrays.length;
	
	if (document.getElementById(current).classList.contains("aliveCell")) {
		if (aliveNeighbors < 2) {
			document.getElementById(current).classList.remove("aliveCell");
		} else if (aliveNeighbors > 3) {
			document.getElementById(current).classList.remove("aliveCell");
		} else { //(aliveNeighbors == 3 || aliveNeighbors == 2) 
			document.getElementById(current).classList.add("aliveCell");
		}

	} else {
		if (aliveNeighbors == 3) {
			document.getElementById(current).classList.add("aliveCell");
		}
	}
}