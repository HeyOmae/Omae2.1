const initialState = {
	grade: {
		id: '23382221-fd16-44ec-8da7-9b935ed2c1ee',
		name: 'Standard',
		ess: '1',
		cost: '1',
		avail: '0',
		source: 'SR5',
		page: '451'
	}
};

const augmentationReducer = (state = initialState, action) => {
	const actionsToTake = {
		SELECT_GRADE(prevState, {grade}) {
			return {
				...prevState,
				grade
			};
		},
		DEFAULT(prevState) { return prevState; }
	};

	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = augmentationReducer;
