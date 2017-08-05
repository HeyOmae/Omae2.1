import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';
import waregrades from '../../../data/waregrade.json';
import { purchaseGear } from '../../../actions';

class CyberlimbComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.changeActiveType = this.changeActiveType.bind(this);

		this.state = {
			activeType: 'Obvious'
		};
	}

	componentWillMount() {
		const {cyberlimbsByType, location, purchase} = this.props;
		this.cyberlimbData = Object.keys(cyberlimbsByType).reduce((memo, type) => {
			return {
				...memo,
				[type]: cyberlimbsByType[type].map((cyberlimb) => {
					return (
						<CyberlimbRows
							key={`cyberlimb-${location}-${cyberlimb.name}`}
							cyberlimb={cyberlimb}
							purchase={purchase}
						/>
					);
				})
			};
		}, {});
	}

	changeActiveType(activeType) {
		this.setState({activeType});
	}

	render() {
		const {cyberlimbsByType, location} = this.props;
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
						<WareGradeComponent />
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
							body={this.cyberlimbData[this.state.activeType]}
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
	purchase: PropTypes.func.isRequired
};

const CyberlimbRows = ({purchase, cyberlimb}) => {
	const {name, ess, capacity, avail, cost, source, page} = cyberlimb;
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
			<td>{ess}</td>
			<td>{capacity}</td>
			<td>{avail}</td>
			<td>{cost}&yen;</td>
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
	purchase: PropTypes.func.isRequired
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

const WareGradeComponent = () => {
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
			>
				{waregrades.map((grade) => {
					return (
						<option
							value={grade.name}
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

const mapDispatchToProps = (dispatch) => {
	const actions = {
		purchase: purchaseGear
	};
	return bindActionCreators(actions, dispatch);
};

export default connect(null, mapDispatchToProps)(CyberlimbComponent);
