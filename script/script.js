window.addEventListener("load", function() {
	var submitBtn = document.getElementById("submit");
	submitBtn.addEventListener("click", function() {
		var inputBox = document.getElementById("input");
		var input = inputBox.value;
		var output = execute(parse(input)).toString();
		logIO(input, output);
	});

	function logIO(input, output) {
		var ul = document.getElementById("io-log");
		var li = document.createElement("li");
		var inputDiv = document.createElement("div");
		var outputDiv = document.createElement("div");
		inputDiv.appendChild(document.createTextNode("Input: " + input));
		outputDiv.appendChild(document.createTextNode("Output: " + output));
		li.appendChild(inputDiv);
		li.appendChild(outputDiv);
		ul.appendChild(li);
	}
})