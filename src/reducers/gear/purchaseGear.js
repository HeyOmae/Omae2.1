/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  weapons: {}
};


const purchaseGearReducer = (state=initialState, action) => {

  const actionsToTake = {
    PURCHASE: () => {
      
    },
    SELL: () => {

    },
    DEFAULT: () => { return state; }
  };
  return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = purchaseGearReducer;
