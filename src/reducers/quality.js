/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

const initialState = {
	Positive: [],
	Negative: []
};

const qualityReducer = (state=initialState, action) => {
	const actionsToTake = {
		SELECT_QUALITY: () => {
			const {newQuality} = action.parameter;

			return Object.assign(
					{},
					state,
					{
						[newQuality.category]: [
							...state[newQuality.category],
							newQuality
						]
					}
				);
		},
		REMOVE_QUALITY: () => {
			const {qualityIndex, category} = action.parameter,
				qualityArray = state[category];
			return Object.assign(
					{},
					state,
					{
						[category]: [
							...qualityArray.slice(0, qualityIndex),
							...qualityArray.slice(qualityIndex + 1)
						]
					}
				);
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)();
};

module.exports = qualityReducer;
