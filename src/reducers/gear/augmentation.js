const initialState = {
	grade: 0,
};

const augmentationReducer = (state = initialState, action) => {
	const actionsToTake = {
		SELECT_GRADE(prevState, {grade}) {
			return {
				...prevState,
				grade,
			};
		},
		DEFAULT(prevState) { return prevState; },
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = augmentationReducer;
