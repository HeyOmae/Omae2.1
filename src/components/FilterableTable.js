import React, {
	Component,
	PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import {} from '../actions/';

class FilterableTable extends Component {
	render() {
		const { actions, tableData } = this.props;
		return (
			<div
				className="table-responsive"
				actions={actions}>
				<input
					className="form-control"
					type="text"
					onChange={(event) => {
						console.log(event.target.value);
					}}/>
				<table>
					<thead>{tableData.header}</thead>
					<tbody>{}</tbody>
				</table>
			</div>);
	}
}

FilterableTable.propTypes = {
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	const props = {};
	return props;
}

function mapDispatchToProps(dispatch) {
	const actions = {};
	const actionMap = { actions: bindActionCreators(actions, dispatch) };
	return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterableTable);
