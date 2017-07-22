import React from 'react';
import PropTypes from 'prop-types';

class CyberlimbComponent extends React.PureComponent {
	componentWillMount() {
		const {cyberlimbsByType, location} = this.props;
		this.cyberlimbData = Object.keys(cyberlimbsByType).reduce((memo, type) => {
			return {
				cyberlimbTypes: [
					...memo.cyberlimbTypes,
					<label
						className="btn btn-primary"
						key={`cyberlimb-${location}-${type}`}
						htmlFor={`cyberlimb-${location}-${type}`}
					>
						<input
							type="radio"
							name="cyberlimb-type"
							id={`cyberlimb-${location}-${type}`}
							autoComplete="off"
							checked={false}
							onChange={() => {}}
						/>
						{type}
					</label>
				],
				cyberlimbs: {
					...memo.cyberlimbs,
					[type]: cyberlimbsByType[type].map((cyberlimb) => {
						return (
							<div
								key={`cyberlimb-${location}-${cyberlimb.name}`}
							>
								{cyberlimb.name}
							</div>
						);
					})
				}
			};
		}, {cyberlimbTypes: [], cyberlimbs: {}});
	}
	render() {
		return (
			<div>
				<div className="btn-group">
					{this.cyberlimbData.cyberlimbTypes}
				</div>
				<div>
					{this.cyberlimbData.cyberlimbs.Obvious}
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

export default CyberlimbComponent;
