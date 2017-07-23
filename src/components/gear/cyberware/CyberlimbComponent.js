import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../../DisplayTableComponent';

class CyberlimbComponent extends React.PureComponent {
	constructor(props) {
		super(props);

		this.changeActiveType = this.changeActiveType.bind(this);

		this.state = {
			activeType: 'Obvious'
		};
	}

	componentWillMount() {
		const {cyberlimbsByType, location} = this.props;
		this.cyberlimbData = Object.keys(cyberlimbsByType).reduce((memo, type) => {
			return {
				...memo,
				[type]: cyberlimbsByType[type].map((cyberlimb) => {
					return (
						<CyberlimbRows
							key={`cyberlimb-${location}-${cyberlimb.name}`}
							{...cyberlimb}
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

const CyberlimbRows = ({name, ess, capacity, avail, cost, source, page}) => {
	return (
		<tr>
			<td><button>+</button></td>
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
	name: PropTypes.string.isRequired,
	ess: PropTypes.string.isRequired,
	capacity: PropTypes.string.isRequired,
	avail: PropTypes.string.isRequired,
	cost: PropTypes.string.isRequired,
	source: PropTypes.string.isRequired,
	page: PropTypes.string.isRequired
};

CyberlimbComponent.propTypes = {
	location: PropTypes.string.isRequired,
	cyberlimbsByType: PropTypes.objectOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired
			}).isRequired
		).isRequired
	).isRequired
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

export default CyberlimbComponent;
