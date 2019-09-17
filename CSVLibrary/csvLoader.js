alert("Welcome to my date math checker!");
function hoverText(td) {
	var text = "Date: "+td.parentNode.id+";  "+td.id+": "+td.innerHTML;
	document.getElementById("hoverdata").innerHTML = text;
	td = null;
}
function displayAsTable(data,header) {
	var sum = [];
	var recordCounter = 0;
	var tableHTML = "<TABLE border=2>";
	// Add the header
	tableHTML += "<TR>";
	for (index in header) {
		tableHTML += "<TH>"+header[index]+"</TH>";
		sum[header[index]] = 0;
	}
	tableHTML += "</TR>";
	// Add the data
	for (rowIndex in data) {
		tableHTML += "<TR id=\""+rowIndex+"\"><TD id=\"rowName\">"+rowIndex+"</TD>";
		for (fieldIndex in data[rowIndex]) {
			tableHTML += "<TD id=\""+fieldIndex+"\" onMouseOver=\"hoverText(this);\">"+data[rowIndex][fieldIndex]+"</TD>";
			sum[fieldIndex] += Number(data[rowIndex][fieldIndex]);
		}
		tableHTML += "</TR>";
		recordCounter++;
	}
	// Finish it up
	tableHTML += "<TR><TH>AVERAGE:</TH>"
	for (index in sum) {
		if (index!="Date")
			tableHTML += "<TH>"+(sum[index]/recordCounter).toFixed(2)+"</TH>";
	}
	tableHTML += "</TR></TABLE>";
	document.getElementById("fileContents").innerHTML = tableHTML;
}
function displayFile() {
	// Template started from lesson 26.
	// Inspiration for this demo comes from 
	// Gravelle, Robert. "Read Text Files Using the Javascript FileReader." n.d.
	// 		Retrieved from https://www.htmlgoodies.com/beyond/javascript/read-text-files-using-the-javascript-filereader.html 13 Oct 2017.
	// Zakas, Nicholas C. "Working with Files in Javascript, part 2." 15 May 2012.
	//		Retrieved from https://www.nczonline.net/blog/2012/05/15/working-with-files-in-javascript-part-2/ 13 Oct 2017.
	
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		//Retrieve the first (and only!) File from the FileList object
		var fileObject = document.getElementById("filePicker").files[0]; 

		if (!fileObject) {
			alert("Failed to load file");
		} else if (!fileObject.name.match('.csv')) {
			alert(fileObject.name + " is not a valid csv file.");
		} else {
			// The FileReader is generic and can apply to any file.
			var filePointer = new FileReader();
			filePointer.onload = function(event) {
				var csvData = [];
				var csvLines = event.target.result.split("\r\n");
				var header = csvLines[0].split(",");
				for (var lineCounter=1;lineCounter<csvLines.length;lineCounter++) {
					// Start with 1 because line 0 is the header line.
					var thisRow = csvLines[lineCounter].split(",");
					csvData[thisRow[0]] = [];
					for (var fieldCounter=1;fieldCounter<thisRow.length;fieldCounter++) {
						// Start with 1 because the first column is the row name.
						csvData[thisRow[0]][header[fieldCounter]] = thisRow[fieldCounter];
					}
				}
				displayAsTable(csvData,header);

				displayChartTemp(csvData);
				displayChartHum(csvData);
				displayChartPre(csvData);
			};
			// Once the generic instructions have been defined, we can now process the specific file.
			filePointer.readAsText(fileObject);
		}
	} else {
	  alert('The File APIs are not fully supported by your browser.');
	}
} //displayFile()
function displayChartTemp (csvData) {
	var canvasId = document.getElementById("canvasTemperature");
	var context = canvasId.getContext("2d");
	context.fillStyle = "#00FFFF";
	context.fillRect(0,0,399,299);
	context.strokeStyle = "black";
   	var numberPoints = 22;
	var pixelsPerPoint = Math.floor(400/numberPoints);
	context.beginPath();
	var dataPosition = 1;
	for (var row in csvData) {
		var value = csvData[row]["Temperature"];
		var xPos = dataPosition * pixelsPerPoint;
		var yPos = Math.floor(300 - (2 * value));		//Value is multipled by 2 in order to get to proper scaling.
		if (dataPosition == 1) {
			context.moveTo(xPos, yPos);	
		} else {
			context.lineTo(xPos, yPos);	
		}
		dataPosition++;
	} //for row
	context.stroke();
	context.moveTo(0,150); 								//Draw line through the middle of the canvas
	context.lineTo(400, 150);
    context.stroke();
	context.strokeText("75", 0, 160);				 	//https://www.w3schools.com/tags/canvas_stroketext.asp
	context.strokeText("150", 0, 10);
	context.strokeText("0", 0, 280);
	context.strokeText("May 10", 0, 295);
	context.strokeText("May 14", 80, 295);
	context.strokeText("May 19", 160, 295);
	context.strokeText("May 24", 240, 295);
	context.strokeText("May 29", 320, 295);
} //displayChart()
function displayChartHum (csvData) {							//Function repeted from work in class
	var canvasId = document.getElementById("canvasHumidity");
	var context = canvasId.getContext("2d");
	context.fillStyle = "#00FFFF";
	context.fillRect(0,0,399,299);
	context.strokeStyle = "black";
   	var numberPoints = 22;
	var pixelsPerPoint = Math.floor(400/numberPoints);
	context.beginPath();
	var dataPosition = 1;
	for (var row in csvData) {
		var value = csvData[row]["Humidity"];
		var xPos = dataPosition * pixelsPerPoint;
		var yPos = Math.floor(300 - (3.5 * value)) + 100; //+100 in order to shift the graph downwards. Value is multipled by 3.5 in order to get to proper scaling.
		if (dataPosition == 1) {
			context.moveTo(xPos, yPos);	
		} else {
			context.lineTo(xPos, yPos);	
		}
		dataPosition++;
	} //for row
	context.stroke();
	context.moveTo(0,150);								//Draw line through the middle of the canvas
	context.lineTo(399, 150);
    context.stroke();
	context.strokeText("60", 0, 160);					//https://www.w3schools.com/tags/canvas_stroketext.asp
	context.strokeText("120", 0, 10);
	context.strokeText("0", 0, 280);
	context.strokeText("May 10", 0, 295);
	context.strokeText("May 14", 80, 295);
	context.strokeText("May 19", 160, 295);
	context.strokeText("May 24", 240, 295);
	context.strokeText("May 29", 320, 295);
} //displayChart()
function displayChartPre (csvData) {							//Function repeted from work in class
	var canvasId = document.getElementById("canvasPrecipitation");
	var context = canvasId.getContext("2d");
	context.fillStyle = "#00FFFF";
	context.fillRect(0,0,399,299);
	context.strokeStyle = "black";
   	var numberPoints = 22;
	var pixelsPerPoint = Math.floor(400/numberPoints);
	context.beginPath();
	var dataPosition = 1;
	for (var row in csvData) {
		var value = csvData[row]["Precipitation"];
		var xPos = dataPosition * pixelsPerPoint;
		var yPos = Math.floor(300 - (200 * value)) - 30;	//-30 in order to shift the graph upwards. Value is multipled by 200 in order to get to proper scaling.
		if (dataPosition == 1) {
			context.moveTo(xPos, yPos);											
		} else {
			context.lineTo(xPos, yPos);	
		}										
		dataPosition++;		
	} //for row
	context.stroke();
	context.moveTo(0,90);								//Draw line through the middle of the canvas
	context.lineTo(400, 90);
    context.stroke();
	context.strokeText("1.3", 0, 10);					//https://www.w3schools.com/tags/canvas_stroketext.asp
	context.strokeText("1", 0, 85);
	context.strokeText("0", 0, 280);
	context.strokeText("May 10", 0, 295);
	context.strokeText("May 14", 80, 295);
	context.strokeText("May 19", 160, 295);
	context.strokeText("May 24", 240, 295);
	context.strokeText("May 29", 320, 295);
} //displayChart()