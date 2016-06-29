'use strict';

import React from 'react';
let qualityData = require('json!./data/qualities.json');

require('styles//Quality.sass');

class QualityComponent extends React.Component {
	render() {
		let qualities = {
			Positive: [],
			Negative: []
		};
		qualityData.forEach((quality)=>{
			qualities[quality.category].push(
				<tr key={quality.category + '-' + quality.name}>
					<td><button className="btn btn-success">+</button></td>
					<td>{quality.name}</td>
					<td>{quality.karma}</td>
					<td>{quality.source} p{quality.page}</td>
				</tr>
			);
		});
		return (
			<div className="quality-component">
				<h2>Qualities</h2>
				<div className="table-responsive">
					<h3>Positive</h3>
					<table className="table">
						<thead>
							<tr>
								<th>Add</th>
								<th>Name</th>
								<th>Karma</th>
								<th>Ref</th>
							</tr>
						</thead>
						<tbody>
							{qualities.Positive}
						</tbody>
					</table>
				</div>
				<div className="table-responsive">
					<h3>Negative</h3>
					<table className="table">
						<thead>
							<tr>
								<th>Add</th>
								<th>Name</th>
								<th>Karma</th>
								<th>Ref</th>
							</tr>
						</thead>
						<tbody>
							{qualities.Negative}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}



QualityComponent.displayName = 'QualityComponent';

// Uncomment properties you need
// QualityComponent.propTypes = {};
// QualityComponent.defaultProps = {};

export default QualityComponent;
