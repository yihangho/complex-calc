function parse(input) {
	// Define the relative precedence of operators
	var precedence = {
		"+": 0,
		"-": 0,
		"*": 1,
		"/": 1,
		"^": 2
	};

	// Define built-in functions
	var builtInFunctions = ["abs", "arg", "re", "im"];

	// Convert input string to lowercase and remove white spaces from the beginning and end of the string
	input = input.toLowerCase().trim();

	var operand = [], operator = [];
	// Add a custom pop method to the operator array
	operator.top = function() {
		return operator[operator.length - 1];
	};

	var previousType;

	// Convert the input expression to RPN
	while (input.length > 0) {
		if (input.search(/^i\W/) != -1 || input.search(/^i$/) != -1) {
			operand.push(new Complex(0, 1));
			input = input.substr(1).trim();
			previousType = "number"
		} else if (input.search(/^(\d+\.*\d*)(i*)/) != -1) {
			if (RegExp["$2"]) {
				operand.push(new Complex(0, parseFloat(RegExp["$1"])));
			} else {
				operand.push(new Complex(parseFloat(RegExp["$1"]), 0));
			}
			input = input.substr(RegExp["$1"].length + RegExp["$2"].length).trim();
			previousType = "number";
		} else if (input[0] == "(") {
			if (previousType == "number" || previousType == ")") {
				input = "*" + input;
				continue;
			} else {
				operator.push("(");
				previousType = "(";
				input = input.substr(1).trim();
			}
		} else if (input[0] == ")") {
			while (operator.length && operator.top() != "(") {
				operand.push(operator.pop());
			}
			if (operator.length) {
				operator.pop();
				if (operator.length && builtInFunctions.indexOf(operator.top())) {
					operand.push(operator.pop());
				}
			} else {
				throw new Error("Mismatched parenthesis.");
			}
			input = input.substr(1).trim();
			previousType = ")";
		} else if (precedence.hasOwnProperty(input[0])) {
			var op = input[0];
			while (operator.length && precedence[op] <= precedence[operator.top()]) {
				operand.push(operator.pop());
			}
			operator.push(op);
			previousType = input[0];
			input = input.substr(1).trim();
		} else {
			input.search(/^(\w+)/);
			token = RegExp["$1"];
			if (builtInFunctions.indexOf(token) != -1) {
				operator.push(token);
			} else {
				throw new Error("Unrecognized token '" + token + "'.");
			}
			input = input.substr(token.length).trim();
		}
	}

	// Push the remaining operators.
	while (operator.length) {
		if (operator.top() != "(") {
			operand.push(operator.pop());
		} else {
			operator.pop();
		}
	}

	return operand;
}