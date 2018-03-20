const parse = require('../syntax/parser');
const assert = require('assert');

// TODO Consider switching to Jest, but we would need to rename a few files
// and refactor a few as well.

// to debug failing tests, use     console.log(JSON.stringify(result));
const astCompare = (x, y) => JSON.stringify(x) === JSON.stringify(y);

/* eslint-disable no-undef */
describe('Exp1 Binary', () => {
  const expected = {
    body: {
      statements: [
        {
          op: '+',
          left: 'x',
          right: 'y',
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      op: '',
      left: '',
      right: '',
    };
  });
  it('should correctly parse Exp1 Binary Expressions', () => {
    expected.body.statements[0].op = '+';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    let result = parse('x + y');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].op = '-';
    expected.body.statements[0].left = 'x';
    expected.body.statements[0].right = 'y';
    result = parse('x - y');
    assert.equal(astCompare(expected, result), true);

    expected.body.statements[0].op = '+';
    expected.body.statements[0].left = {
      op: '-',
      left: {
        op: '+',
        left: {
          op: '+',
          left: 'x',
          right: 'y',
        },
        right: { value: 3 },
      },
      right: { value: 12 },
    };
    expected.body.statements[0].right = { value: 123123 };
    result = parse('x + y + 3 - 12 + 123123');
    assert.equal(astCompare(expected, result), true);
  });
});