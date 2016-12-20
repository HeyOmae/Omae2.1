const FilterTable = (state = '', action) => {
	const actionsToTake = {
		SET_FILTER: (prevState, {filterTerm}) => {
			return filterTerm;
		},
		DEFAULT: (prevState) => { return prevState; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

module.exports = FilterTable;
