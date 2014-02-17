function execute(input, variables) {
	// input should be an array given by parse()

	function getOperands(num, resolve) {
		var output = [];
		if (stack.length < num) {
			throw new Error("Not enough operand(s).");
		}
		for (var i = 0; i < num; i++) {
			output.unshift(stack.pop());
		}
		if (resolve) {
			resolveAllIfNeeded(output);
		}
		return output;
	}

	function resolveAllIfNeeded(input) {
		for (var i = 0; i < input.length; i++) {
			if (typeof input[i] == "string") {
				if (!(variables[input[i]] instanceof Complex)) {
					throw new Error("Undefined variable '" + input[i] + "'");
				} else {
					input[i] = variables[input[i]];
				}
			}
		}
	}

	function resolve(input) {
		if (typeof input == "string") {
			if (variables[input] instanceof Complex) {
				return variables[input];
			} else {
				throw new Error("Undefined variable '" + input + "'");
			}
		} else {
			return input;
		}
	}

	var stack = [], tmp;
	var operators = ["=", "+", "-", "*", "/", "^", "abs", "arg", "re", "im", "conj", "ln"];

	for (var i = 0; i < input.length; i++) {
		var cur = input[i];

		if (operators.indexOf(cur) == -1) {
			stack.push(cur);
		} else {
			switch(cur) {
				case "+":
					tmp = getOperands(2, true);
					stack.push(tmp[0].add(tmp[1]));
					break;
				case "-":
					tmp = getOperands(2, true);
					stack.push(tmp[0].minus(tmp[1]));
					break;
				case "*":
					tmp = getOperands(2, true);
					stack.push(tmp[0].multiply(tmp[1]));
					break;
				case "/":
					tmp = getOperands(2, true);
					stack.push(tmp[0].divide(tmp[1]));
					break;
				case "^":
					tmp = getOperands(2, true);
					stack.push(tmp[0].exponent(tmp[1]));
					break;
				case "=":
					tmp = getOperands(2, false);
					if (typeof tmp[1] == "string") {
						tmp[1] = resolve(tmp[1]);
					}
					if (typeof tmp[0] != "string") {
						throw new Error("Cannot assign to '" + tmp[0] + "'");
					}
					variables[tmp[0]] = tmp[1];
					stack.push(tmp[1]);
				case "abs":
					tmp = getOperands(1, true);
					stack.push(tmp[0].modulus());
					break;
				case "arg":
					tmp = getOperands(1, true);
					stack.push(tmp[0].argument());
					break;
				case "re":
					tmp = getOperands(1, true);
					stack.push(tmp[0].real_part());
					break;
				case "im":
					tmp = getOperands(1, true);
					stack.push(tmp[0].imaginary_part());
					break;
				case "conj":
					tmp = getOperands(1, true);
					stack.push(tmp[0].conjugate());
					break;
				case "ln":
					tmp = getOperands(1, true);
					stack.push(tmp[0].ln());
					break;
			}
		}
	}

	if (stack.length) {
		return resolve(stack.pop());
	}
}