window.addEventListener("load", function() {
	var variables = {
		"ans": new Complex(0, 0), 
		"e": new Complex(Math.E, 0), 
		"pi": new Complex(Math.PI, 0),
		"sqrt2": new Complex(Math.SQRT2, 0)
	};

	var history = [], historyPointer = null;

	var form = document.getElementsByTagName("form")[0];
	form.addEventListener("submit", calculate);
	
	var submitBtn = document.getElementById("submit");
	submitBtn.addEventListener("click", calculate);

	var inputBox = document.getElementById("input");
	inputBox.addEventListener("keydown", function(event) {
		if (event.keyCode == 38) {
			if (historyPointer === null && history.length) {
				historyPointer = history.length - 1;
			} else if (historyPointer > 0) {
				historyPointer--;
			}

			displayHistory();

			event.preventDefault();
		} else if (event.keyCode == 40) {
			if (historyPointer !== null && historyPointer != history.length - 1) {
				historyPointer++;
			}

			displayHistory();

			event.preventDefault();
		}
	});

	function displayHistory() {
		var inputBox = document.getElementById("input");

		if (historyPointer !== null) {
			inputBox.value = history[historyPointer];
		}
	}

	function calculate(event) {
		var inputBox = document.getElementById("input");
		var input = inputBox.value;

		if (input.length == 0) {
			return;
		}

		history.push(input);
		// Reset historyPointer
		historyPointer = null;

		try {
			variables["ans"] = execute(parse(input), variables);
			var output = variables["ans"].toString(variables["fix"]);
			logIO(input, output);
		} catch(e) {
			logIO(input, e);
		}

		inputBox.value = "";

		event.preventDefault();
	}

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