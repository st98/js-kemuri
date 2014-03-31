var Kemuri = (function () {
  function Kemuri(source) {
    if (!(this instanceof Kemuri)) {
      return new Kemuri(source);
    }

    this.source = source || '';
    this.stack = [];
    this.at = 0
  };

  Kemuri.prototype.xor = function () {
    this.stack.push(this.stack.pop() ^ this.stack.pop());
  };

  Kemuri.prototype.not = function () {
    this.stack.push(~this.stack.pop());
  };

  Kemuri.prototype.dup = function () {
    var x = this.stack.pop();

    this.stack.push(x);
    this.stack.push(x);
  };

  Kemuri.prototype.rot = function () {
    var x = this.stack.pop();
    var y = this.stack.pop();
    var z = this.stack.pop();

    this.stack.push(x, z, y);
  };

  Kemuri.prototype.hello = function () {
    var i;
    var hello = 'Hello, world!';

    for (i = hello.length; i--;) {
      this.stack.push(hello.charCodeAt(i));
    }
  };

  Kemuri.prototype.print = function () {
    var i;
    var result = '';

    for (i = this.stack.length; i--;) {
      result += String.fromCharCode(this.stack.pop());
    }

    console.log(result);
  };

  Kemuri.prototype.step = function () {
    var instruction = this.source[this.at];

    switch (instruction) {
      case '^':
        this.xor();
        break;

      case '~':
        this.not();
        break;

      case '"':
        this.dup();
        break;

      case "'":
        this.rot();
        break;

      case '`':
        this.hello();
        break;

      case '|':
        this.print();
        break;
    }
  };

  Kemuri.prototype.run = function () {
    var len;

    this.stack = [];
    this.at = 0;

    for (len = this.source.length; this.at < len; this.at++) {
      this.step();
    }
  };

  return Kemuri;
}).call(this);
