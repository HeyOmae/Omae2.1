/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

const initialState = {
	Positive: [],
	Negative: [],
	karma: {
		Positive: 0,
		Negative: 0,
	},
};

const qualityReducer = (state = initialState, action) => {
	const actionsToTake = {
		SELECT_QUALITY: (prevState, {newQuality}) => {
			const {category} = newQuality;

			return Object.assign(
				{},
				prevState,
				{
					[category]: [
						...prevState[category],
						newQuality,
					],
					karma: Object.assign(
						{},
						prevState.karma,
						{
							[category]: prevState.karma[category] + Number(newQuality.karma),
						},
					),
				},
			);
		},

		REMOVE_QUALITY: (prevState, {qualityIndex, category}) => {
			const qualityArray = prevState[category],
				removeQualityKarma = prevState[category][qualityIndex].karma;
			return Object.assign(
				{},
				prevState,
				{
					[category]: [
						...qualityArray.slice(0, qualityIndex),
						...qualityArray.slice(qualityIndex + 1),
					],
					karma: Object.assign(
						{},
						prevState.karma,
						{
							[category]: prevState.karma[category] - Number(removeQualityKarma),
						},
					),
				},
			);
		},
		DEFAULT: (prevState) => { return prevState; },
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = qualityReducer;
