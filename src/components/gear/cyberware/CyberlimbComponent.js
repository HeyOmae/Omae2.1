import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import metatypeData from 'data/metatype.json';
import DisplayTable from '../../DisplayTableComponent';
import waregrades from '../../../data/waregrade.json';
import { purchaseGear } from '../../../actions';
import WareGradeComponent from './WareGradeComponent';

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
				<h4>Cyber {location}</h4>
				<div className="row justify-content-between">
					<div className="col-12 col-md-4">
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
					<div className="col-12 col-md-4">
						<div className="row justify-content-between">
							<div className="col">
								<h5>Agi</h5>
								<button
									className="btn btn-success"
									onClick={() => { this.incrementAttribute('agi'); }}
								>
									+
								</button>
								{this.state.agi}
								<button
									className="btn btn-warning"
									onClick={() => { this.decrementAttribute('agi'); }}
								>
									-
								</button>
							</div>
							<div className="col">
								<h5>Str</h5>
								<button
									className="btn btn-success"
									onClick={() => { this.incrementAttribute('str'); }}
								>
									+
								</button>
								{this.state.str}
								<button
									className="btn btn-warning"
									onClick={() => { this.decrementAttribute('str'); }}
								>
									-
								</button>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-4">
						<WareGradeComponent />
					</div>
				</div>
				<div>
					<div>
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

const CyberLimbHeader = () => {
	return (
		<tr>
			<th>Buy</th>
			<th>Name</th>
			<th>Essense</th>
			<th>Capcaity</th>
			<th>Avail</th>
			<th>Cost</th>
			<th>Ref</th>
		</tr>
	);
};

const CyberlimbRows = ({purchase, cyberlimb, currentGrade, availModifier}) => {
	const {name, ess, capacity, avail, cost, source, page} = cyberlimb,
		grade = waregrades[currentGrade],
		currentAvail = Number(avail) + Number(grade.avail) + availModifier,
		customLimb = {
			...cyberlimb,
			ess: ess * Number(grade.ess),
			avail: currentAvail > 0 ? currentAvail : 0,
			cost: (cost * Number(grade.cost)) + (availModifier * 5000)
		};
	return (
		<tr>
			<td>
				<button
					className="btn btn-success"
					onClick={
						() => {
							purchase({
								gear: customLimb,
								category: 'augmentations'
							});
						}
					}
				>
					+
				</button>
			</td>
			<td>{name}</td>
			<td>{customLimb.ess}</td>
			<td>{capacity}</td>
			<td>{customLimb.avail}</td>
			<td>{customLimb.cost}&yen;</td>
			<td>{source} {page}p</td>
		</tr>
	);
};

CyberlimbRows.propTypes = {
	cyberlimb: PropTypes.shape({
		name: PropTypes.string.isRequired,
		ess: PropTypes.string.isRequired,
		capacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	purchase: PropTypes.func.isRequired,
	currentGrade: PropTypes.number.isRequired,
	availModifier: PropTypes.number.isRequired
};

const CyberlimbRadioSelect = ({isTypeActive, location, type, changeActiveType}) => {
	return (
		<label
			className={`btn btn-primary ${isTypeActive ? 'active' : ''}`}
			htmlFor={`cyberlimb-${location}-${type}`}
			>
			<input
				type="radio"
				name="cyberlimb-type"
				id={`cyberlimb-${location}-${type}`}
				autoComplete="off"
				checked={isTypeActive}
				onChange={() => {
					changeActiveType(type);
				}}
			/>
			{type}
		</label>
	);
};

CyberlimbRadioSelect.propTypes = {
	isTypeActive: PropTypes.bool.isRequired,
	location: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	changeActiveType: PropTypes.func.isRequired
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

export {CyberLimbHeader};

export default connect(mapStateToProps, mapDispatchToProps)(CyberlimbComponent);
