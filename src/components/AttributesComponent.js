'use strict';

import React from 'react';
let metatypeData = require('json!./data/metatype.json'),
	priorityData = require('json!./data/priority.json');

require('styles//Attributes.sass');

class AttributesComponent extends React.Component {
	render() {
		const {priorityRating, metatype, attributes, actions} = this.props;
		var attributeElements = {
			incrementButtons: [],
			displayAttribute: [],
			decrementButtons: []
		};
		const attList = ['bod', 'agi', 'rea', 'str', 'wil', 'log', 'int', 'cha'];
		for(let att in metatypeData[metatype].min) {
			if(attList.indexOf(att) > -1) {
				let baseAtt = metatypeData[metatype].min[att],
					maxAtt = metatypeData[metatype].max[att],
					maxPoints = maxAtt - baseAtt;

				attributeElements.incrementButtons.push(
					<td>
						<button
							key={'incBtn'+att}
							className="btn btn-success"
							onClick={() => {
									actions.incrementAttribute({
										attribute: att,
										max: maxPoints,
										maxCap: false
									});
								}}
						>
							+
						</button>
					</td>
				);
				attributeElements.displayAttribute.push(
					<td>
						{baseAtt + attributes[att]} / {maxAtt}
					</td>
				);
				attributeElements.decrementButtons.push(
					<td>
						<button
							key={'decBtn'+att}
							className="btn btn-success"
							onClick={() => {
									actions.decrementAttribute({
										attribute: att,
										max: maxPoints,
										maxCap: false
									});
								}}
						>
							-
						</button>
					</td>
				);
			} else {
				//special stats go here later
			}
		}
		return (
			<div className="attributes-component ">
				<div className="row">
					<div className="col-xs-12 col-md-9 table-responsive">
						<h2>Attributes</h2>
						<table className="table">
							<thead>
								<tr>
									<th>Bod</th>
									<th>Agi</th>
									<th>Rea</th>
									<th>Str</th>
									<th>Wil</th>
									<th>Log</th>
									<th>Int</th>
									<th>Cha</th>
									<th>Points</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									{attributeElements.incrementButtons}
								</tr>
								<tr>
									{attributeElements.displayAttribute}
									<td>
										{priorityData[priorityRating].attributes}
									</td>
								</tr>
								<tr>
									{attributeElements.decrementButtons}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

AttributesComponent.displayName = 'AttributesComponent';

// Uncomment properties you need
// AttributesComponent.propTypes = {};
// AttributesComponent.defaultProps = {};

export default AttributesComponent;
