const FilterTable = (state='', action) => {
	const actionsToTake = {
		SET_FILTER: ({filterTerm}) => {
			return filterTerm;
		},
		DEFAULT: () => { return state; }
	};
	return (actionsToTake[action.type] || actionsToTake.DEFAULT)(action.parameter);
};

module.exports = FilterTable;
