const parse = require('../syntax/parser');
const assert = require('assert');


describe('Accessor Expressions', () => {
  // Initialize test object for reuse.
  const expected = {
    body: {
      statements: [
        {
          ids: [''],
          initializers: [{ value: false }],
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      ids: [],
      initializers: [{}],
    };
  });


  it('should correctly parse a simple property access', () => {
    expected.body.statements[0].ids[0] = 'jensKnowledge';
    expected.body.statements[0].initializers[0] = { object: 'jen', property: 'knowledge' };
    expected.body.statements[0].used = false;
    const result = parse('jensKnowledge := jen.knowledge');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse a function call whose callee is a member', () => {
    expected.body.statements[0].ids[0] = 'HOISIN_SAUCE';
    expected.body.statements[0].initializers[0] = {
      callee: {
        object: 'jen',
        property: 'consume',
      },
      args: [],
    };
    expected.body.statements[0].used = false;
    const result = parse('HOISIN_SAUCE := jen.consume()\n\n\n');
    assert.deepEqual(result, expected);
  });

  it('should correctly parse multiple chained accessors', () => {
    expected.body.statements[0].ids[0] = 'infinity';
    expected.body.statements[0].initializers[0] = {
      object: {
        object: {
          object: 'loop',
          property: 'loop',
        },
        property: 'loop',
      },
      property: 'loop',
    };
    expected.body.statements[0].used = false;
    const result = parse('infinity := loop.loop.loop.loop');
    assert.deepEqual(result, expected);
  });
});
