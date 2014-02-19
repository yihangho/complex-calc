window.addEventListener("load", function() {
	var variables = {
		"ans": new Complex(0, 0), 
		"e": new Complex(Math.E, 0), 
		"pi": new Complex(Math.PI, 0),
		"sqrt2": new Complex(Math.SQRT2, 0)
	};
	var submitBtn = document.getElementById("submit");
	submitBtn.addEventListener("click", function() {
		var inputBox = document.getElementById("input");
		var input = inputBox.value;

		if (input.length == 0) {
			return;
		}

		try {
			variables["ans"] = execute(parse(input), variables);
			var output = variables["ans"].toString(variables["fix"]);
			logIO(input, output);
		} catch(e) {
			logIO(input, e);
		}
	});

	function logIO(input, output) {
		var ul = document.getElementById("io-log");
		var li = document.createElement("li");
		var inputDiv = document.createElement("div");
		var outputDiv = document.createElement("div");
		inputDiv.appendChild(document.createTextNode("Input: " + input));
		
		if (output instanceof Error) {
			outputDiv.appendChild(document.createTextNode("Error: " + output.message));
			outputDiv.style.color = "red";
		} else {
			outputDiv.appendChild(document.createTextNode("Output: " + output.toString()));
		}

		li.appendChild(inputDiv);
		li.appendChild(outputDiv);
		ul.appendChild(li);
	}
})