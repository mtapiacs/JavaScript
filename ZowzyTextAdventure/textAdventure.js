/* Text Adventure Game
TO-DO
- Check user input 								(X)
- Split into words 								(X)
- Compare the first word to known instructions	(X)
- Change states 								(X)
- Display response 								(X)


*/

function init () {												//CALLED TO INITIATE GAME
	rooms = [ 													//ARRAY OF ROOMS FOR DESCRIPTIONS OR CHECK
		[["You're in the middle of what seems to be a closed room. You look straight, and all you see are lights at a distance. You look back, yet all you see darkness. You look left, and you see a door. You look right, and yet again, another door."], "</br></br> You're in the place you started. Inside you see some old chandeliers and 3 doors. The door in the middle has lights coming out..."],
		["</br></br> You're in a room that contains very little. There are a couple of objects. At the corner you see a dead chicken and by the barred window you see a cupboard."],
		["You carefully and silently walk forward towards the light. Upon arriving you see another door. There is light emitted through the seams. What would you like to do?"]
																//["Nullam sodales quam nec justo venenatis, ac fermentum ipsum gravida. Aenean lacinia leo augue, vel porta velit placerat blandit. Phasellus rutrum convallis commodo. Etiam urna metus, bibendum eu velit eu, placerat maximus mauris. Morbi sapien orci, suscipit et sodales sed, tempor id turpis. Nullam egestas gravida eros, at varius lectus condimentum vel. Nunc pretium aliquet est, eget pulvinar turpis. Duis malesuada pretium augue id imperdiet. Morbi pretium tincidunt magna vitae laoreet. Pellentesque odio leo, sodales at congue et, varius nec metus. Phasellus non nisl in lectus porttitor suscipit eget vel justo. Donec non fringilla dolor. Ut eu felis interdum, laoreet leo ac, mattis purus. Aliquam dignissim ornare massa eget pharetra."],
	];
	haveChecked = 0;											// USED FOR CHECK/TAKE FUNCTION
	haveOpened = 0;										

	inventory = []; 											//INVENTORY DEFINED AS EMPTY
	playerPosition = 0; 										//PLAYER STARTS A POSITION 0 (THE MAIN ROOM)
	responderBox = document.getElementById("currentState"); 	//RESPONDER BOX POINTS TO CURRENT STATE ID IN PARAGRAPH
	responderBox.innerHTML += rooms[0][0]; 						//ADDS ROOM 0 AT INDEX 0 TO THE "USER CONSOLE"
	
	document.addEventListener("keypress", function(event) {		//ESTABLISHES AN EVENT LISTENER THAT CATCHES KEYPRESES ON ENTER
	commandBox = document.getElementById("commandBox");			//CALLS COMMAND BOX (THE INPUT BOX)
	isFocused = (document.activeElement === commandBox);		//CHECKS IF THE SELECTED COMMAND BOX IS "ACTIVE (FOCUSED)"
		if (event.keyCode == 13 && isFocused) { 				//INPUT BOX MUST BE SELECTED AND ENTER MUST BE PRESSED
			command = commandBox.value; 						//EXTRACTS VALUE FROM INPUT THEN SPLITS IT
			splitCommands = command.split(" "); 				//SEPARATES BY SPACES
			room(splitCommands[0].toLowerCase()); 				//SPLIT COMMAND IS SENT MADE LOWERASE THEN SENT TO THE ROOM()
			commandBox.value = ""; 								//CLEARS INPUT BOX AFTER SENDING FORWARD
		}
	});
}

function room (command) {										//CALLED FOR CONSOLE INPUTS
	switch (command) { 											//INIT EVENT LISTENERS SENDS THE SPLIT COMMAND TO THIS ROOM FUNCTION. ACCORDING TO THE COMMAND, IT CALLS THE APPROPRIATE FUNCTION
		case "north":
		case "n":
			north();
			break;
		case "south":
		case "s":
			south();
			break;
		case "east":
		case "e":
			east();
			break;
		case "west":
		case "w":
			west();
			break;
		case "inventory":
			inventoryCheck();
			break;
		case "take":
			take();
			break;
		case "look":
			look();
			break;
		case "open":
			openDoor();
			break;
		case "check":
			check();
			break;
		case "examine":
			examine();
			break;
		case "footsteps":
			keyRequired = "opened";								//KEY REQUIRED SET TO OPENED IN ORDER TO FULFILL OPENDOOR() CONDITIONAL
			openDoor();
			break;
		case "watch":
			watch();
			break;
		default:												//SWITCH STATEMENT CALLS DEFAULTRES() IF NO COMMAND IS FOUND
			defaultRes();
	}
}

function north () {												//CALLED FOR NORTH COMMAND
	if (playerPosition == 0) { 									//IF THE PLAYER IS IN THE MAIN ROOM AND GOES NORTH THE FUNCTION IS CALLED
		roomThree();
	} else if (playerPosition == 3 && inventory.includes("Raspberry Pi", "Toy Chicken", "Monkey")) {
		responderBox.innerHTML += "</br></br>CONGRATULATIONS! YOU HAVE WON THE GAME WITH ALL THE BONUS EASTER EGG ITEMS!";
	} else if (playerPosition == 3) {							//IF PLAYER IS IN ROOM 3 AND CALLS NORTH HE WINS
		responderBox.innerHTML += "</br></br>CONGRATULATIONS! YOU HAVE WON THE GAME!";
																//BUTTON FOR VICTORY INCORPORATED FOR FUTURE
	} else {													//CALL THEWALL() IF THE PLAYER IS IN ANY OTHER AREA
		theWall();
	} 
}

function south () {												//CALLED FOR SOUTH COMMAND
	if (playerPosition == 3) {									//IF PLAYER IS IN ROOM[3], THE LAST ROOM, AND GOES SOUTH THE GAME RESTARTS AND EVERYTHING IS LOST
		playerPosition = 0;
		responderBox.innerHTML += "</br></br> Want to go back? As you say so!</br></br> YOU NOW LOST ALL YOUR ITEMS </br></br>";
		init();
	} else { 													//WALL IS CALLED IF THE PERSON IS IN ANY OTHER ROOM
		theWall();
	}
	/*
	if (playerPosition == 0) {
		theWall(); //SHOULD I JUST INSERT THE TEXT!
	} else if (playerPosition == 1) {
		responderBox.innerHTML += "</br></br> There is nothing that way sir";
	} else if (playerPosition == 2) {
		responderBox.innerHTML += "</br></br> There is nothing that way sir";
	} else { //STRIPS PLAYER FROM EVERYTHING AND RESTARTS
		playerPosition = 0;
		responderBox.innerHTML += "</br></br> Want to go back? As you say so!</br></br> YOU NOW LOST ALL YOUR ITEMS </br></br>";
		init();
	}
	*/
}

function east () {												//CALLED FOR EAST COMMAND
	if (playerPosition == 0) {
		roomOne();
	} else if (playerPosition == 2) {
		playerPosition = 0; 									//CHANGES PLAYER POSITION
		responderBox.innerHTML += "</br></br> You're in the main room";
	} else {
		theWall();
	}
}

function west () {												//CALLED FOR WEST COMMAND
	if (playerPosition == 0) {
		roomTwo();
	} else if (playerPosition == 1) { 							//CHANGES PLAYER POSITION 
		playerPosition = 0;
		responderBox.innerHTML += "</br></br> You're in the main room";
	} else {
		theWall();
	}
	/*
	if (playerPosition == 0) { 
		roomTwo();
	} else if (playerPosition == 1) {
		playerPosition = 0;
		responderBox.innerHTML += "</br></br> You're in the main room";
	} else if (playerPosition == 2) {
		responderBox.innerHTML += "</br></br> There is nothing that way sir";
	} else {
		responderBox.innerHTML += "</br></br> Why west bro? You have the exit up ahead and a tv! There is nothing west!";
	}
	*/
}

function roomOne () {											//CALLED FOR ROOM TO TOTAL EAST
	keyRequired = 0;											//THIS ROOM REQUIRES NO KEY
	if (playerPosition == 0) {									//ASKS IF WANTS TO OPEN DOOR
		responderBox.innerHTML += "</br></br> There is a door...What do you wish to do?"; 
		if (splitCommands[0] == "open") { //IF OPEN IS TYPED, OPEN THE DOOR
			openDoor();
		}
	}
	/*
	if (playerPosition == 1) {
		responderBox.innerHTML += "</br></br> You're in the room bud!";
	} else */	
}

function roomTwo () {											//CALLED FOR ROOM TO TOTAL WEST
	keyRequired = 1;
	if (playerPosition == 0) {									//QUESTION FOR DESIRING TO OPEN DOOR
		responderBox.innerHTML += "</br></br> There is a door...What do you wish to do?";
		if (splitCommands[0] == "open") {
			openDoor(); 								
		}
	}  
}

function roomThree () {											//CALLED FOR ROOM TO TOTAL NORTH
	keyRequired = "Passcode";									//REQUIRES A PASSWORD
	responderBox.innerHTML += "</br></br>" + rooms[2];			//GIVES ROOM TWO EXAMPLE
}

function theWall () {											//CALLED FOR MISSCALLED DIRECTION COMMANDS
	responderBox.innerHTML += "</br></br> Upon looking, you notice there is nothing but a wall...";
}

function examine () {											//CALLED THROUGH SWITCH STATEMENT EXAMINES ROOM 2 OTHER ROOMS HAVE NOTHING
	if (playerPosition == 2) {
		responderBox.innerHTML += "</br></br> Upon examining the sheet of paper on the desk...There is a riddle that says, \"The answer to the riddle is the answer to it all...It states: <b>The more you take, the more you leave behind. What am I?</b>";
	} else {
		responderBox.innerHTML += "</br></br> There is nothing to examine in this room";
	}
}

function check () {												//CALLED TO CHECK ROOMS FOR ITEMS
	if (playerPosition == 0) {									//CHECKS THE PARTICULAR ROOM ACCORDING TO THE PLAYER POSITION		
		responderBox.innerHTML += "</br></br> You look around, yet you find nothing but a raspberry pi. What would you like to do?";
		haveChecked = "Saw Main";								//STATES THE PLAYER ROOM CHECKED IN ORDER TO ALLOW FUNCTION TAKE()
	} else if (playerPosition == 1) {
		responderBox.innerHTML += "</br></br> Upon checking the room, you find a key inside the cupboard. What would you like to do?";
		haveOpened = 1;
	} else if (playerPosition == 2) {
		responderBox.innerHTML += "</br></br> You look around, yet you find nothing but a toy chicken. What would you like to do?";
		haveChecked = "Saw Two";
	} else {
		responderBox.innerHTML += "</br></br> You look around, yet you find nothing but a monkey. What would you like to do?";	
		haveChecked = "Saw Three";
	}	
	/*
	if (splitCommands[0] == "check") {
		openDoor();
	}
	responderBox.innerHTML += "</br></br> You're in the room bud!";
	*/
}

function take () {												//CALLED TO TAKE ITEMS
	if (haveOpened == 1 && playerPosition == 1) {				//IF DOOR HAS BEEN OPENED AND PLAYER IS IN ROOM ONE KEY CAN BE TAKEN
		inventory.push("keyA");									//ADDS ELEMENTS TO INVENTORY
		responderBox.innerHTML += "</br></br>YOU NOW HAVE THE KEY!";
	} else if (haveChecked == "Saw Main") {						//ROOM MUST BE CHECKED TO TAKE OBJECT
		inventory.push("Raspberry Pi");
		responderBox.innerHTML += "</br></br>YOU NOW HAVE THE RASPBERRY PI!";
	} else if (haveChecked == "Saw Two") {					
		inventory.push("Toy Chicken");
		responderBox.innerHTML += "</br></br>YOU NOW HAVE THE TOY CHICKEN!";
	} else if (haveChecked == "Saw Three") {
		inventory.push("Monkey");								
		responderBox.innerHTML += "</br></br>YOU NOW HAVE THE MONKEY!";
	} else {
		defaultRes();											//IF THE PREVIOUS CONDITIONS ARE NOT MET THEN THE COMMAND IS NOT IN ORDER
	}
}

function look () {												//CALLED TO LOOK AROUND A ROOM
	if (playerPosition == 0) {									//CHECKS ROOM AND ADDS ACCORDINGLY
		responderBox.innerHTML += rooms[0][1]; 
	} else if (playerPosition == 1) {
		responderBox.innerHTML += rooms[1]; 
	} else if (playerPosition == 2) {
		responderBox.innerHTML += "</br></br> This room has very dim lights. At the center is an antique desk. On the desk, lies a sheet of paper.";	
	} else {													//IF THE PLAYER IS NOT IN THE OTHER ROOMS; HE IS IN THE LAST ONE BY DEFAULT
		responderBox.innerHTML += "</br></br> There is a door with an \"EXIT\" sign straight ahead! Also, there is a TV rolling some credits and a couch!";	
	}
}

function openDoor () {											//CALLED TO OPEN A PARTICULAR DOOR
	if (keyRequired == 0 && playerPosition == 0) {				//CHECKS THE DOOR REQUIREMENTS AND PLAYER POSITION
		responderBox.innerHTML += "</br></br> You have walked into the room! You should \"look\" around";
		playerPosition = 1;										//CHANGES PLAYER LOCATION ACCORDINGLY
	} else if (keyRequired == 1 && playerPosition == 0) {
		if (inventory.includes("keyA")) {						//CHECKS IF PLAYER HAS THE KEY TO ENTER THE MAIN ROOM
			responderBox.innerHTML += "</br></br> You have walked into the room! You should \"look\" around";
			playerPosition = 2;
		}	else {
			responderBox.innerHTML += "</br></br> The door is locked, sorry PAL";
		}
	} else if (keyRequired == "Passcode" && playerPosition == 0) {	//CHECKS ROOM REQUIREMENT FOR PASSCODE AND PLAYER LOCATION AT MAIN
		responderBox.innerHTML += "</br></br> What is the password!";
	}
	if (splitCommands[0] == "footsteps" && playerPosition == 0) {	//IF COMMAND "FOOTSTEPS" IS WRITTEN AND PLAYER IS AT PLAYERPOSITION == 0 THEN DOOR WILL OPEN
		responderBox.innerHTML += "</br></br> You have OPENED THE MAIN DOOR!";
		playerPosition = 3;											//LOCATION MOVED TO PLAYER LOCATION 3
	}
	/*
	if (playerPosition == 1 && inventory.includes("keyA")) {
		responderBox.innerHTML += "</br></br>The door has opened!";
	}
	*/
}

function inventoryCheck () {									//CALLED TO CHECK INVENTORY
	var inventoryContents = "";
	if (inventory.length == 0) {								//IF INVENTORY IS EMPTY THEN "NOTHING" IS SET
		inventoryContents = "nothing";
	} else {
		for (var ctr = 0; ctr < inventory.length; ctr++) { 		//CYCLES THROUGH ALL ELEMENTS AND SETS ALL ELEMENTS TO DISPLAY
			inventoryContents += inventory[ctr] + ", ";
		}
		/*inventoryContents = inventory;*/ 
	}
	responderBox.innerHTML += "</br></br><b>You have the following:</b> " + inventoryContents;
}

function watch () {												//CALLED TO WATCH TV (PROGRAM TV IN FUTURE)!
	if (playerPosition === 3) {
		alert("Thank you for playing my simple text adventure game! I hope you have enjoyed playing it. Feel free to check my other projects in my github repo. My username is \"mtapiafdez\". Go NORTH to complete the game! Try to find all easter items too!");
	}
	
}

function defaultRes () { 										//CALLED IF DEFAULT RESPONSE IS NECESSARY
	responderBox.innerHTML += ("</br></br><b>I DO NOT UNDERSTAND THAT COMMAND</b>");
}