function execute(input) {
	// input should be an array given by parse()

	var stack = [];

	for (var i = 0; i < input.length; i++) {
		var cur = input[i];

		if (cur instanceof Complex) {
			stack.push(cur);
		} else {
			switch(cur) {
				case "+":
					if (stack.length >= 2) {
						var b = stack.pop(), a = stack.pop();
						stack.push(a.add(b));
					}
					break;
				case "-":
					if (stack.length >= 2) {
						var b = stack.pop(), a = stack.pop();
						stack.push(a.minus(b));
					}
					break;
				case "*":
					if (stack.length >= 2) {
						var b = stack.pop(), a = stack.pop();
						stack.push(a.multiply(b));
					}
					break;
				case "/":
					if (stack.length >= 2) {
						var b = stack.pop(), a = stack.pop();
						stack.push(a.divide(b));
					}
					break;
			}
		}
	}

	if (stack.length) {
		return stack.pop();
	}
}