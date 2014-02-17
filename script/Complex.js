// This complex class
function Complex(re, im) {
	this.re = re;
	this.im = im;

	if (typeof this.add != "function") {
		Complex.prototype.add = function(another) {
			var re = this.re + another.re;
			var im = this.im + another.im;
			return new Complex(re, im);
		};

		Complex.prototype.minus = function(another) {
			var re = this.re - another.re;
			var im = this.im - another.im;
			return new Complex(re, im);
		};

		Complex.prototype.multiply = function(another) {
			var re = this.re * another.re - this.im * another.im;
			var im = this.re * another.im + this.im * another.re;
			return new Complex(re, im);
		};

		Complex.prototype.divide = function(another) {
			var denominator = another.re * another.re + another.im * another.im;
			var tmp = this.multiply(another.conjugate());
			tmp.re /= denominator;
			tmp.im /= denominator;
			return tmp;
		};

		Complex.prototype.exponent = function(another) {
			console.log("Here!");
			var r = this.modulus(), t = this.argument(), c = Math.log(r);
			console.log("r = " + r);
			console.log("t = " + t);
			console.log("c = " + c);
			var newR = Math.exp(c * another.re - another.im * t);
			var newT = c * another.im + another.re * t;
			
			return new Complex(newR * Math.cos(newT), newR * Math.sin(newT));
		}

		Complex.prototype.real_part = function() {
			return new Complex(this.re, 0);
		};

		Complex.prototype.imaginary_part = function() {
			return new Complex(this.im, 0);
		};

		Complex.prototype.modulus = function() {
			var a2 = this.re * this.re;
			var b2 = this.im * this.im;
			return new Complex(Math.sqrt(a2 + b2), 0);
		};

		Complex.prototype.argument = function() {
			return new Complex(Math.atan2(this.im, this.re), 0);
		};

		Complex.prototype.polar = function() {
			return "(" + this.modulus() + ", " + this.argument() + " rad)";
		};

		Complex.prototype.conjugate = function() {
			this.im *= -1;
			return this;
		};

		Complex.prototype.toString = function() {
			if (this.re && this.im) {
				if (this.im == 1) {
					return this.re + " + i";
				} else if (this.im == -1) {
					return this.re + " - i";
				} else if (this.im > 0) {
					return this.re + " + " + this.im + "i";
				} else {
					return this.re + " - " + -1 * this.im + "i";
				}
				
			} else if (this.im) {
				if (this.im == 1) {
					return "i";
				} else if (this.im == -1) {
					return "-i";
				} else {
					return this.im + "i";
				}
			} else {
				return this.re;
			}
		};
	}
}