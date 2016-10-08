import React, {
	Component,
	PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {setFilter} from '../actions/';

class FilterableTable extends Component {
	render() {
		const { actions, tableData, filterTable } = this.props;
		console.log(actions.filterTable, filterTable);
		return (
			<div
				className="table-responsive">
				<input
					className="form-control"
					type="text"
					onChange={(event) => {
						actions.setFilter({filterTerm: event.target.value});
					}}/>
				<table>
					<thead>{tableData.header}</thead>
					<tbody>{tableData.body}</tbody>
				</table>
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
