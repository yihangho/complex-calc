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
			var r = this.modulus(), t = this.argument(), c = Math.log(r);
			var newR = Math.exp(c * another.re - another.im * t);
			var newT = c * another.im + another.re * t;
			
			return new Complex(newR * Math.cos(newT), newR * Math.sin(newT));
		};

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

		Complex.prototype.ln = function() {
			return new Complex(Math.log(this.modulus().re), this.argument().re);
		};

		Complex.prototype.toString = function(fix) {
			if (fix instanceof Complex) {
				fix = Math.round(fix.re);
				fix = Math.min(fix, 21); // fix <= 21
				fix = Math.max(fix, 1);  // fix >= 1
			} else {
				fix = undefined;
			}

			if (!isFinite(this.re) || !isFinite(this.im)) {
				return "undefined";
			}

			var re = this.re.toPrecision(fix);
			var im = this.im.toPrecision(fix);

			if (parseFloat(re) && parseFloat(im)) {
				if (parseFloat(im) == 1) {
					return re + " + i";
				} else if (parseFloat(im) == -1) {
					return re + " - i";
				} else if (parseFloat(im) > 0) {
					return re + " + " + im + "i";
				} else {
					return re + " - " + -1 * im + "i";
				}
				
			} else if (parseFloat(im)) {
				if (parseFloat(im) == 1) {
					return "i";
				} else if (parseFloat(im) == -1) {
					return "-i";
				} else {
					return im + "i";
				}
			} else {
				return re;
			}
		};
	}
}