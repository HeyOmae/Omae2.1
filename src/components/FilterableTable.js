import React, {
	Component,
	PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DisplayTable from './DisplayTableComponent';

import {setFilter} from '../actions/';

// helpers
function filtered(term, tableRows) {
	let expression = '(' + term + ')',
		regExp = new RegExp(expression, 'i');
	return tableRows.filter((row)=>{
		return row.key.match(regExp);
	});
}

class FilterableTable extends Component {
	render() {
		const { actions, tableData, filterTable } = this.props,
		filteredRows = filterTable ? filtered(filterTable, tableData.body) : tableData.body;
		return (
			<div
				className="table-responsive">
				<input
					className="form-control"
					type="text"
					placeholder="Filter the table"
					onChange={(event) => {
						actions.setFilter({filterTerm: event.target.value});
					}}
					value={filterTable}/>
				<DisplayTable
					header={tableData.header}
					body={filteredRows}/>
			</div>);
	}
}

FilterableTable.propTypes = {
	actions: PropTypes.object.isRequired,
	filterTable: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	const props = {
		filterTable: state.filterTable
	};
	return props;
}

function mapDispatchToProps(dispatch) {
	const actions = {
		setFilter
	};
	const actionMap = { actions: bindActionCreators(actions, dispatch) };
	return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableTable);
