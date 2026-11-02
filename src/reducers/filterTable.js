const FilterTable = (state = '', action) => {
	const actionsToTake = {
		SET_FILTER(prevState, {filterTerm}) {
			return filterTerm;
		},
		TOGGLE_MODAL() { return ''; },
		DEFAULT(prevState) { return prevState; },
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(state, action.parameter);
};

export default FilterTable;
