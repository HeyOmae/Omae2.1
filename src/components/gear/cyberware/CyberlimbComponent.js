import React from 'react';
import PropTypes from 'prop-types';

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
						<div
							key={`cyberlimb-${location}-${cyberlimb.name}`}
						>
							{cyberlimb.name}
						</div>
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
								isTypeActive={this.state.activeType === type}
								location={location}
								type={type}
								changeActiveType={this.changeActiveType}
							/>
						);
					})}
				</div>
				<div>
					{this.cyberlimbData[this.state.activeType]}
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
	).isRequired
};

const CyberlimbRadioSelect = ({isTypeActive, location, type, changeActiveType}) => {
	return (
		<label
			className={`btn btn-primary ${isTypeActive ? 'active' : ''}`}
			key={`cyberlimb-${location}-${type}`}
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
