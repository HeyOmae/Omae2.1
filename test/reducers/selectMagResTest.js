var reducer = require('../../src/reducers/selectMagRes');

describe('selectMagRes', () => {

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });
});
