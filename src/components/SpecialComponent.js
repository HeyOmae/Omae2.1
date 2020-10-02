import React from 'react';
import PropTypes from 'prop-types';

class SpecialComponent extends React.Component {
	render() {
		const { elements, pointsLeft, magicName } = this.props;
		return (
			<div className="special-component col-lg-12 col-xl-3">
				<h2>Special</h2>
				<table className="table">
					<thead>
						<tr>
							<th>Edg</th>
							{magicName ? (
								<th>{magicName === 'Magic' ? 'Mag' : 'Res'}</th>
							) : null}
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{elements.incBtn}
							<td />
						</tr>
						<tr className={pointsLeft < 0 ? 'table-danger' : ''}>
							{elements.display}
							<td>{pointsLeft}</td>
						</tr>
						<tr>
							{elements.decBtn}
							<td />
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

SpecialComponent.displayName = 'SpecialComponent';

SpecialComponent.propTypes = {
	elements: PropTypes.shape({
		incBtn: PropTypes.array.isRequired,
		display: PropTypes.array.isRequired,
		decBtn: PropTypes.array.isRequired,
	}).isRequired,
	pointsLeft: PropTypes.number.isRequired,
	magicName: PropTypes.string,
};

SpecialComponent.defaultProps = {
	magicName: '',
};

export default SpecialComponent;
