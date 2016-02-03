'use strict';

import React from 'react';
import SpecialComponent from './SpecialComponent';
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
			base: {
				incBtn: [],
				display: [],
				decBtn: []
			},
			special: {
				incBtn: [],
				display: [],
				decBtn: []
			}
		},
			pointsLeft = priorityData[priorityRating].attributes - attributes.spent;

		const attList = ['bod', 'agi', 'rea', 'str', 'wil', 'log', 'int', 'cha'];
		for(let att in metatypeData[metatype].min) {
			let baseAtt = metatypeData[metatype].min[att] || 0,
				maxAtt = metatypeData[metatype].max[att] || 6,
				maxPoints = maxAtt - baseAtt;

			function addingElements(attType) {
				attributeElements[attType].incBtn.push(
					<IncrementButton
						attributes={attributes}
						attName={att}
						maxPoints={maxPoints}
						pointsLeft={pointsLeft}
						incrementAttribute={actions.incrementAttribute}
						key={'incBtn-'+att}
					/>
				);
				attributeElements[attType].display.push(
					<td key={'display-'+att} className={attributes[att] > maxAtt ? 'table-danger' : ''}>
						{baseAtt + attributes[att]}/{maxAtt}
					</td>
				);
				attributeElements[attType].decBtn.push(
					<DecrementButton
						attName={att}
						decrementAttribute={actions.decrementAttribute}
						maxPoints={maxPoints}
						key={'decBtn-'+att}
					/>
				)
			}

			if(attList.indexOf(att) > -1) {
				addingElements('base');
			} else {
				//special stats go here later
				addingElements('special');
			}
		}
		return (
			<div className="attributes-component ">
				<div className="row">
					<div className="col-lg-12 col-xl-9">
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
										{attributeElements.base.incBtn}
										<td></td>
									</tr>
									<tr className={pointsLeft < 0 ? 'table-danger':''}>
										{attributeElements.base.display}
										<td>
											{pointsLeft}
										</td>
									</tr>
									<tr>
										{attributeElements.base.decBtn}
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<SpecialComponent />
				</div>
			</div>
		);
	}
}

const IncrementButton = ({attributes, attName, maxPoints, pointsLeft, incrementAttribute, key}) => {
	return (
		<td key={key}>
			<button
				className={'btn ' + activeButton(attributes[attName], maxPoints) }
				onClick={() => {
						if(pointsLeft > 0){
							incrementAttribute({
								attribute: attName,
								max: maxPoints
							});
						}
					}}
			>
				+
			</button>
		</td>
	)
}

const DecrementButton = ({attName, decrementAttribute, maxPoints, key}) => {
	return(
		<td key={key}>
			<button
				className="btn btn-success"
				onClick={() => {
						decrementAttribute({
							attribute: attName,
							max: maxPoints
						});
					}}
			>
				-
			</button>
		</td>
	)
}

AttributesComponent.displayName = 'AttributesComponent';

// Uncomment properties you need
// AttributesComponent.propTypes = {};
// AttributesComponent.defaultProps = {};

export default AttributesComponent;
