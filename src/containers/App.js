/* CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import React, {
	Component,
	PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import PriorityTableComponent from '../components/PriorityTableComponent';
import MetatypeSelector from '../components/MetatypeSelectorComponent';
import AttributesComponent from '../components/AttributesComponent';
import MagicSelectionComponent from '../components/magic/MagicSelectionComponent';

/* Populated by react-webpack-redux:reducer */
class App extends Component {
	render() {
		const {actions, priorityTable, selectMetatype, attributes} = this.props;
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<Main
							actions={actions}
							priorityTable={priorityTable}
							selectMetatype={selectMetatype}
							attributes={attributes}/>

						<PriorityTableComponent
							actions={actions.priorityTable}
							priorityTable={priorityTable} />
					</div>
				</div>

				<div className="row">
					<div className="col-md-12 col-lg-9">
						<MetatypeSelector
							priorityRating={priorityTable.metatype}
							metatype={selectMetatype}
							action={actions.selectMetatype}/>

						<AttributesComponent
							metatypeRating={priorityTable.metatype}
							priorityRating={priorityTable.attribute}
							metatype={selectMetatype}
							actions={{
								incrementAttribute: actions.incrementAttribute,
								decrementAttribute: actions.decrementAttribute
							}}
							attributes={attributes} />

						<MagicSelectionComponent
							magicPriority={priorityTable.magres}/>
					</div>
					
				</div>
			</div>
		);
	}
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */
App.propTypes = {
	actions: PropTypes.object.isRequired,
	priorityTable: PropTypes.object.isRequired,
	selectMetatype: PropTypes.string.isRequired,
	attributes: PropTypes.object.isRequired
};
function mapStateToProps(state) {
	/* Populated by react-webpack-redux:reducer */
	const props = {
		priorityTable: state.priorityTable,
		selectMetatype: state.selectMetatype,
		attributes: state.attributes
	};
	return props;
}
function mapDispatchToProps(dispatch) {
	/* Populated by react-webpack-redux:action */
	const actions = {
		priorityTable: require('../actions/priorityTable.js'),
		selectMetatype: require('../actions/selectMetatype.js'),
		incrementAttribute: require('../actions/attributes/incrementAttribute.js'),
		decrementAttribute: require('../actions/attributes/decrementAttribute.js')
	};
	const actionMap = { actions: bindActionCreators(actions, dispatch) };
	return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
