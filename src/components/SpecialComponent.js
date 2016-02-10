'use strict';

import React from 'react';

require('styles//Special.sass');

class SpecialComponent extends React.Component {
	render() {
		const {elements, pointsLeft, magicName} = this.props;
		return (
			<div className="special-component col-lg-12 col-xl-3">
				<h2>Special</h2>
				<table className="table">
					<thead>
						<tr>
							<th>Edg</th>
							{ magicName ? <th>{magicName === 'Magic' ? 'Mag' : 'Res'}</th> : null }
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{elements.incBtn}
							<td></td>
						</tr>
						<tr className={pointsLeft < 0 ? 'table-danger':''}>
							{elements.display}
							<td>
								{pointsLeft}
							</td>
						</tr>
						<tr>
							{elements.decBtn}
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

SpecialComponent.displayName = 'SpecialComponent';

// Uncomment properties you need
// SpecialComponent.propTypes = {};
// SpecialComponent.defaultProps = {};

export default SpecialComponent;
