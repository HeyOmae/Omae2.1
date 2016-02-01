'use strict';

import React from 'react';
let metatypeData = require('json!./data/metatype.json'),
	priorityData = require('json!./data/priority.json');

require('styles//Attributes.sass');

function activeButton(currentAtt, maxAtt) {
	if(currentAtt > maxAtt) {
		return 'disabled btn-danger';
	} else {
		return 'btn-success';
	}
}

class AttributesComponent extends React.Component {
	render() {
		const {priorityRating, metatype, attributes, actions} = this.props;
		var attributeElements = {
			incrementButtons: [],
			displayAttribute: [],
			decrementButtons: []
		},
			pointsLeft = priorityData[priorityRating].attributes - attributes.spent;

		const attList = ['bod', 'agi', 'rea', 'str', 'wil', 'log', 'int', 'cha'];
		for(let att in metatypeData[metatype].min) {
			if(attList.indexOf(att) > -1) {
				let baseAtt = metatypeData[metatype].min[att],
					maxAtt = metatypeData[metatype].max[att],
					maxPoints = maxAtt - baseAtt;

				attributeElements.incrementButtons.push(
					<td key={'incBtn-'+att}>
						<button
							className={'btn ' + activeButton(attributes[att], maxPoints) }
							onClick={() => {
									if(pointsLeft > 0){
										actions.incrementAttribute({
											attribute: att,
											max: maxPoints
										});
									}
								}}
						>
							+
						</button>
					</td>
				);
				attributeElements.displayAttribute.push(
					<td key={'display-'+att}>
						{baseAtt + attributes[att]}/{maxAtt}
					</td>
				);
				attributeElements.decrementButtons.push(
					<td key={'decBtn-'+att}>
						<button
							className="btn btn-success"
							onClick={() => {
									actions.decrementAttribute({
										attribute: att,
										max: maxPoints
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
					<div className="col-md-12 col-lg-9">
						<div className="table-responsive">
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
											{pointsLeft}
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
			</div>
		);
	}
}

const IncrementButton = () => {
	
}

AttributesComponent.displayName = 'AttributesComponent';

// Uncomment properties you need
// AttributesComponent.propTypes = {};
// AttributesComponent.defaultProps = {};

export default AttributesComponent;
