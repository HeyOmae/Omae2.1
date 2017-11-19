import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import metatypeData from 'data/metatype.json';
import DisplayTable from '../../DisplayTableComponent';
import { purchaseGear } from '../../../actions';
import WareGradeComponent from './WareGradeComponent';
import CyberlimbRows from './CyberlimbRowComponent';
import CyberlimbRadioSelect from './CyberlimbRadioSelect';
import CyberlimbAttribute from './CyberlimbAttributeComponent';
import CyberLimbHeader from './CyberlimbHeader';

class CyberlimbComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.changeActiveType = this.changeActiveType.bind(this);

		this.state = {
			activeType: 'Obvious',
			agi: 3,
			str: 3
		};
	}

	changeActiveType(activeType) {
		this.setState({activeType});
	}

	incrementAttribute(attribute) {
		const { metatype } = this.props,
			maxAttribute = metatypeData[metatype].max[attribute];

		this.setState((prevState) => {
			const currentCyberAttribute = prevState[attribute];
			return {
				[attribute]: currentCyberAttribute >= maxAttribute ? currentCyberAttribute : currentCyberAttribute + 1
			};
		});
	}

	decrementAttribute(attribute) {
		this.setState((prevState) => {
			return {
				[attribute]: prevState[attribute] === 3 ? 3 : prevState[attribute] - 1
			};
		});
	}

	generateCyberlimbRows() {
		const {cyberlimbsByType, location, purchase, currentGrade} = this.props;
		return Object.keys(cyberlimbsByType).reduce((memo, type) => {
			return {
				...memo,
				[type]: cyberlimbsByType[type].map((cyberlimb) => {
					return (
						<CyberlimbRows
							key={`cyberlimb-${location}-${cyberlimb.name}`}
							cyberlimb={cyberlimb}
							purchase={purchase}
							currentGrade={currentGrade}
							agi={this.state.agi}
							str={this.state.str}
							availModifier={this.state.agi + this.state.str - 6}
						/>
					);
				})
			};
		}, {});
	}

	render() {
		const {cyberlimbsByType, location} = this.props;
		return (
			<div>
				<div className="row justify-content-between">
					<div className="col-12">
						<div className="row justify-content-between">
							<CyberlimbAttribute
								incrementAttribute={() => {
									this.incrementAttribute('agi');
								}}
								decrementAttribute={() => {
									this.decrementAttribute('agi');
								}}
								attributeValue={this.state.agi}
								attributeName="Agi"
							/>
							<CyberlimbAttribute
								incrementAttribute={() => { this.incrementAttribute('str'); }}
								decrementAttribute={() => { this.decrementAttribute('str'); }}
								attributeValue={this.state.str}
								attributeName="Str"
							/>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<h5>Types</h5>
						<div className="btn-group">
							{Object.keys(cyberlimbsByType).map((type) => {
								return (
									<CyberlimbRadioSelect
										key={`cyberlimb-${location}-${type}`}
										isTypeActive={this.state.activeType === type}
										location={location}
										type={type}
										changeActiveType={this.changeActiveType}
									/>
								);
							})}
						</div>
					</div>
					<div className="col-12 col-md-6">
						<WareGradeComponent />
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<DisplayTable
							header={
								<CyberLimbHeader />
							}
							body={this.generateCyberlimbRows()[this.state.activeType]}
						/>
					</div>
				</div>
			</div>
		);
	}
}

CyberlimbComponent.propTypes = {
	location: PropTypes.string.isRequired,
	cyberlimbsByType: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired
			}).isRequired
		).isRequired
	).isRequired,
	purchase: PropTypes.func.isRequired,
	currentGrade: PropTypes.number.isRequired,
	metatype: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
	return {
		currentGrade: state.augmentation.grade,
		metatype: state.selectMetatype.typeName
	};
};

const mapDispatchToProps = (dispatch) => {
	const actions = {
		purchase: purchaseGear
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CyberlimbComponent);
