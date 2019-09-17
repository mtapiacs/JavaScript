document.querySelector("#toConvert").addEventListener("keypress", function (e) {
	var key = e.which;
	if (key == 13) {
		reverse();
	}
})


function reverse () {
	var text = document.getElementById("toConvert").value;
	var textSplit = text.split("");
	var newString = [];
	for (var ctr = textSplit.length; ctr >= 0; ctr--) {
		newString.push(textSplit[ctr]);
	}
	document.getElementById("toConvert").value = "";
	document.getElementById("contentConverted").innerHTML = newString.join("");
}