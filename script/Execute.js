function execute(input) {
	// input should be an array given by parse()

	function getOperands(num) {
		var output = [];
		if (stack.length < num) {
			throw new Error("Not enough operand(s).");
		}
		for (var i = 0; i < num; i++) {
			output.unshift(stack.pop());
		}
		return output;
	}

	var stack = [], tmp;

	for (var i = 0; i < input.length; i++) {
		var cur = input[i];

		if (cur instanceof Complex) {
			stack.push(cur);
		} else {
			switch(cur) {
				case "+":
					tmp = getOperands(2);
					stack.push(tmp[0].add(tmp[1]));
					break;
				case "-":
					tmp = getOperands(2);
					stack.push(tmp[0].minus(tmp[1]));
					break;
				case "*":
					tmp = getOperands(2);
					stack.push(tmp[0].multiply(tmp[1]));
					break;
				case "/":
					tmp = getOperands(2);
					stack.push(tmp[0].divide(tmp[1]));
					break;
				case "^":
					tmp = getOperands(2);
					stack.push(tmp[0].exponent(tmp[1]));
					break;
				case "abs":
					tmp = getOperands(1);
					stack.push(tmp[0].modulus());
					break;
				case "arg":
					tmp = getOperands(1);
					stack.push(tmp[0].argument());
					break;
				case "re":
					tmp = getOperands(1);
					stack.push(tmp[0].real_part());
					break;
				case "im":
					tmp = getOperands(1);
					stack.push(tmp[0].imaginary_part());
					break;
				case "conj":
					tmp = getOperands(1);
					stack.push(tmp[0].conjugate());
					break;
			}
		}
	}

	if (stack.length) {
		return stack.pop();
	}
}