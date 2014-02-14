window.addEventListener("load", function() {
	var variables = {"ans": new Complex(0, 0)};
	var submitBtn = document.getElementById("submit");
	submitBtn.addEventListener("click", function() {
		var inputBox = document.getElementById("input");
		var input = inputBox.value;

		if (input.length == 0) {
			return;
		}

		try {
			variables["ans"] = execute(parse(input), variables);
			var output = variables["ans"].toString();
			logIO(input, output);
		} catch(e) {
			logIO(input, e, true);
		}
	});

	function logIO(input, output, error) {
		var ul = document.getElementById("io-log");
		var li = document.createElement("li");
		var inputDiv = document.createElement("div");
		var outputDiv = document.createElement("div");
		inputDiv.appendChild(document.createTextNode("Input: " + input));
		
		if (error) {
			outputDiv.appendChild(document.createTextNode("Error: " + output.message));
			outputDiv.style.color = "red";
		} else {
			outputDiv.appendChild(document.createTextNode("Output: " + output));
		}

		li.appendChild(inputDiv);
		li.appendChild(outputDiv);
		ul.appendChild(li);
	}
})