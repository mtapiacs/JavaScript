//THESE SHOW FUNCTIONS ENABLE AND DISABLE THE CLASS TOGGLE AND COVER IN ORDER TO MAKE ELEMENTS VISIBLE

function show1 () {
	document.getElementById("cnf").classList.toggle("toggle");
	document.getElementById("cnf").classList.toggle("cover");
	if(document.getElementById("mnf").classList.contains("toggle")){
		document.getElementById("mnf").classList.toggle("toggle");
		document.getElementById("mnf").classList.toggle("cover");
	}
	if(document.getElementById("pnk").classList.contains("toggle")){
		document.getElementById("pnk").classList.toggle("toggle");
		document.getElementById("pnk").classList.toggle("cover");
	}
	if(document.getElementById("mnc").classList.contains("toggle")){
		document.getElementById("mnc").classList.toggle("toggle");
		document.getElementById("mnc").classList.toggle("cover");
	}
}

function show2 () {
	document.getElementById("mnf").classList.toggle("toggle");
	document.getElementById("mnf").classList.toggle("cover");
	if(document.getElementById("cnf").classList.contains("toggle")){
		document.getElementById("cnf").classList.toggle("toggle");
		document.getElementById("cnf").classList.toggle("cover");
	}
	if(document.getElementById("pnk").classList.contains("toggle")){
		document.getElementById("pnk").classList.toggle("toggle");
		document.getElementById("pnk").classList.toggle("cover");
	}
	if(document.getElementById("mnc").classList.contains("toggle")){
		document.getElementById("mnc").classList.toggle("toggle");
		document.getElementById("mnc").classList.toggle("cover");
	}
}

function show3 () {
	document.getElementById("pnk").classList.toggle("toggle");
	document.getElementById("pnk").classList.toggle("cover");
	if(document.getElementById("cnf").classList.contains("toggle")){
		document.getElementById("cnf").classList.toggle("toggle");
		document.getElementById("cnf").classList.toggle("cover");
	}
	if(document.getElementById("mnf").classList.contains("toggle")){
		document.getElementById("mnf").classList.toggle("toggle");
		document.getElementById("mnf").classList.toggle("cover");
	}
	if(document.getElementById("mnc").classList.contains("toggle")){
		document.getElementById("mnc").classList.toggle("toggle");
		document.getElementById("mnc").classList.toggle("cover");
	}
}

function show4 () {
	document.getElementById("mnc").classList.toggle("toggle");
	document.getElementById("mnc").classList.toggle("cover");
	if(document.getElementById("cnf").classList.contains("toggle")){
		document.getElementById("cnf").classList.toggle("toggle");
		document.getElementById("cnf").classList.toggle("cover");
	}
	if(document.getElementById("pnk").classList.contains("toggle")){
		document.getElementById("pnk").classList.toggle("toggle");
		document.getElementById("pnk").classList.toggle("cover");
	}
	if(document.getElementById("mnf").classList.contains("toggle")){
		document.getElementById("mnf").classList.toggle("toggle");
		document.getElementById("mnf").classList.toggle("cover");
	}
}

function cfahrenheit () { //THESE ARE THE CALCULATION FUNCTIONS; THEY ARE PRETTY SELF EXPLANATORY!
	var celsius = Number(document.getElementById("box1").value); 
	var fahrenheit = document.getElementById("box2");
	fahrenheit.value =  Number(9/5 * celsius + 32);
}

function fcelsius () {
	var fahrenheit = Number(document.getElementById("box3").value); 
	var celsius = document.getElementById("box4");
	celsius.value =  Number((fahrenheit - 32) * 5/9);
}

function mfeet () {
	var meters = Number(document.getElementById("box5").value);
	var feets = document.getElementById("box6");
	feets.value = Number(meters * 3.28084);
}

function fmeters () {
	var feets = Number(document.getElementById("box7").value);
	var meters = document.getElementById("box8");
	meters.value = Number(feets / 3.28084);
}

function pkilo () {
	var pounds = Number(document.getElementById("box9").value);
	var kilos = document.getElementById("box10");
	kilos.value = Number(pounds / 2.20462);
}

function kpounds () {
	var kilos = Number(document.getElementById("box11").value);
	var pounds = document.getElementById("box12");
	pounds.value = Number(kilos * 2.20462);
}

function pdollars () {
	var pesos = Number(document.getElementById("box13").value);
	var dollars = document.getElementById("box14");
	dollars.value = Number(pesos / 49.5);
}

function dpesos () {
	var dollars = Number(document.getElementById("box15").value);
	var pesos = document.getElementById("box16");
	pesos.value = Number(dollars * 49.5);
}

function clearCells () {
	document.querySelectorAll("inputClass").value = "";
}

// USED https://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript in order to remember how to utilize class list!

/*
function show1 () { 
	document.getElementById("cnf").style.display = "block";
	document.getElementById("mnk").style.display = "none";
	document.getElementById("pnk").style.display = "none";
	document.getElementById("mnc").style.display = "none";
}

function show2 () { 
	document.getElementById("cnf").style.display = "none";
	document.getElementById("pnk").style.display = "none";
	document.getElementById("mnc").style.display = "none";
	document.getElementById("mnf").style.display = "block";
}

function show3 () { 
	document.getElementById("cnf").style.display = "none";
	document.getElementById("mnf").style.display = "none";
	document.getElementById("mnc").style.display = "none";
	document.getElementById("pnk").style.display = "block";
}

function show4 () { 
	document.getElementById("cnf").style.display = "none";
	document.getElementById("mnf").style.display = "none";
	document.getElementById("pnk").style.display = "none";
	document.getElementById("mnc").style.display = "block";
}
*/



/*
function clean () {
	if(document.getElementById("cnf").classList.contains("toggle")){
		document.getElementById("cnf").classList.toggle("toggle");
		document.getElementById("cnf").classList.toggle("cover");
	} else if(document.getElementById("mnf").classList.contains("toggle")){
		document.getElementById("mnf").classList.toggle("toggle");
		document.getElementById("mnf").classList.toggle("cover");
	} else if(document.getElementById("pnk").classList.contains("toggle")){
		document.getElementById("pnk").classList.toggle("toggle");
		document.getElementById("pnk").classList.toggle("cover");
	} else {
		document.getElementById("mnc").classList.toggle("toggle");
		document.getElementById("mnc").classList.toggle("cover");
	}	
}
*/

//FUNCTION CALCULATE