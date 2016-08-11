var reducer = require('../../src/reducers/purchaseGear');

describe('purchaseGear', () => {

  it('should not change the passed state', (done) => {

    const state = Object.freeze({});
    reducer(state, {type: 'INVALID'});

    done();
  });
});
