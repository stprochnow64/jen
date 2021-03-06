const Type = require('./type.js');

module.exports = class NumericLiteral {
  constructor(value) {
    this.value = value;
  }

  analyze() { // eslint-disable-line class-methods-use-this
    this.type = Type.NUMBER;
  }

  optimize() {
    return this;
  }
};
