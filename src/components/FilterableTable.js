import React, {
	Component,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DisplayTable from './DisplayTableComponent';

import {setFilter} from '../actions';

// component
class FilterableTable extends Component {
	static filtered(term, tableRows) {
		const expression = `(${term})`,
			regExp = new RegExp(expression, 'i');
		return tableRows.filter((row) => {
			return row.key.match(regExp);
		});
	}

	render() {
		const { setFilterAction, tableData, filterTable, header, children, striped, invert} = this.props,
			tableContent = tableData.body || children,
			filteredRows = filterTable ? FilterableTable.filtered(filterTable, tableContent) : tableContent;

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
				<div className="filter-table">
					<DisplayTable
						striped={striped}
						invert={invert}
						header={tableData.header || header}
						body={filteredRows} />
				</div>
			</div>);
	}
}

// prop boilerplate
// refactor this dumb ass thing to look like display table, no damn reason for me to make in consistant interfaces.
FilterableTable.propTypes = {
	setFilterAction: PropTypes.func.isRequired,
	tableData: PropTypes.shape({
		header: PropTypes.element,
		body: PropTypes.node,
	}),
	header: PropTypes.element,
	children: PropTypes.node,
	filterTable: PropTypes.string.isRequired,
	striped: PropTypes.bool,
	invert: PropTypes.bool,
};

FilterableTable.defaultProps = {
	children: null,
	striped: false,
	invert: false,
	header: null,
	tableData: {header: null, body: null},
};

function mapStateToProps(state) {
	const props = {
		filterTable: state.filterTable,
	};
	return props;
}

function mapDispatchToProps(dispatch) {
	return {
		setFilterAction: (filterTerm) => {
			return dispatch(setFilter(filterTerm));
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableTable);
