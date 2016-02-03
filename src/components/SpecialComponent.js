'use strict';

import React from 'react';

require('styles//Special.sass');

class SpecialComponent extends React.Component {
	render() {
		const {priorityRating, metatype, attributes, actions} = this.props;
		return (
			<div className="special-component col-lg-12 col-xl-3">
				<h2>Special</h2>
				<table className="table">
					<thead>
						<tr>
							<th>Edg</th>
							<th>Mag</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						<tr>
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
