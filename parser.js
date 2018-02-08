// Parser module specifically for jen
//
// Heavily inspired by Ray Toal's parser for iki:
// https://github.com/rtoal/iki-compiler
//
// For use:
//
// const parser = require('./parser');
// const program = parse(sourceCodeString);


const ohm = require('ohm-js');
const fs = require('fs');

const grammar = ohm.grammar(fs.readFileSync('../jen.ohm'));

module.exports = (text) => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw match.message;
  }
};
