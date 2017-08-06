import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';
import waregrades from '../../../data/waregrade.json';
import { purchaseGear, selectGrade } from '../../../actions';

class CyberlimbComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.changeActiveType = this.changeActiveType.bind(this);

		this.state = {
			activeType: 'Obvious'
		};
	}

	changeActiveType(activeType) {
		this.setState({activeType});
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
						/>
					);
				})
			};
		}, {});
	}

	render() {
		const {cyberlimbsByType, location, changeGrade, currentGrade} = this.props;
		return (
			<div>
				<h4>Cyber {location}</h4>
				<div className="row justify-content-between">
					<div className="col-xs-12 col-md-4">
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
					<div className="col-xs-12 col-md-4">
						<WareGradeComponent
							changeGrade={changeGrade}
							currentGrade={currentGrade}
						/>
					</div>
				</div>
				<div>
					<div>
						<DisplayTable
							header={
								<tr>
									<th>Buy</th>
									<th>Name</th>
									<th>Essense</th>
									<th>Capcaity</th>
									<th>Avail</th>
									<th>Cost</th>
									<th>Ref</th>
								</tr>
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
	changeGrade: PropTypes.func.isRequired,
	currentGrade: PropTypes.number.isRequired
};

const CyberlimbRows = ({purchase, cyberlimb, currentGrade}) => {
	const {name, ess, capacity, avail, cost, source, page} = cyberlimb,
		grade = waregrades[currentGrade];
	return (
		<tr>
			<td>
				<button
					className="btn btn-success"
					onClick={
						() => {
							purchase({
								gear: cyberlimb,
								category: 'augmentations'
							});
						}
					}
				>
					+
				</button>
			</td>
			<td>{name}</td>
			<td>{ess * Number(grade.ess)}</td>
			<td>{capacity}</td>
			<td>{Number(avail) + Number(grade.avail)}</td>
			<td>{cost * Number(grade.cost)}&yen;</td>
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
	currentGrade: PropTypes.number.isRequired
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

const WareGradeComponent = ({changeGrade, currentGrade}) => {
	return (
		<div className="form-group">
			<label
				htmlFor="ware-grade"
			>
				Grade
			</label>
			<select
				id="ware-grade"
				className="form-control custom-select"
				onChange={(e) => {
					changeGrade({grade: Number(e.target.value)});
				}}
				value={currentGrade}
			>
				{waregrades.map((grade, index) => {
					return (
						<option
							value={index}
							key={`cyber-${grade.name}`}
						>
							{grade.name}
						</option>
					);
				})
				}
			</select>
		</div>
	);
};

WareGradeComponent.propTypes = {
	changeGrade: PropTypes.func.isRequired,
	currentGrade: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
	return {
		currentGrade: state.augmentation.grade
	};
};

const mapDispatchToProps = (dispatch) => {
	const actions = {
		purchase: purchaseGear,
		changeGrade: selectGrade
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CyberlimbComponent);
