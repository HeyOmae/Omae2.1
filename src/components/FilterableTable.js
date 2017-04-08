import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DisplayTable from './DisplayTableComponent';

import {setFilter} from '../actions/';

// helpers
function filtered(term, tableRows) {
	const expression = `(${term})`,
		regExp = new RegExp(expression, 'i');
	return tableRows.filter((row) => {
		return row.key.match(regExp);
	});
}

// component
class FilterableTable extends Component {
	render() {
		const { setFilterAction, tableData, filterTable } = this.props,
			filteredRows = filterTable ? filtered(filterTable, tableData.body) : tableData.body;
		return (
			<div
				className="filter-table--wrapper">
				<input
					className="form-control"
					type="text"
					placeholder="Filter the table"
					onChange={(event) => {
						setFilterAction({filterTerm: event.target.value});
					}}
					value={filterTable} />
				<DisplayTable
					header={tableData.header}
					body={filteredRows} />
			</div>);
	}
}

// prop boilerplate
FilterableTable.propTypes = {
	setFilterAction: PropTypes.func.isRequired,
	tableData: PropTypes.shape({
		header: PropTypes.element.isRequired,
		body: PropTypes.any
	}).isRequired,
	filterTable: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	const props = {
		filterTable: state.filterTable
	};
	return props;
}

function mapDispatchToProps(dispatch) {
	return {
		setFilterAction: (filterTerm) => {
			return dispatch(setFilter(filterTerm));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableTable);
