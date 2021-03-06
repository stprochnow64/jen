module.exports = class Body {
  constructor(statements) {
    this.statements = statements;
  }

  analyze(context) {
    this.statements.forEach(s => s.analyze(context));
  }

  optimize() {
    this.statements.map(s => s.optimize()).filter(s => s !== null);
    return this;
  }
};
