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
					<IncrementButton
						attributes={attributes}
						attName={att}
						maxPoints={maxPoints}
						pointsLeft={pointsLeft}
						incrementAttribute={actions.incrementAttribute}
						key={'incBtn-'+att}
					/>
				);
				attributeElements.displayAttribute.push(
					<td key={'display-'+att} className={attributes[att] > maxAtt ? 'table-danger' : ''}>
						{baseAtt + attributes[att]}/{maxAtt}
					</td>
				);
				attributeElements.decrementButtons.push(
					<DecrementButton
						attName={att}
						decrementAttribute={actions.decrementAttribute}
						maxPoints={maxPoints}
						key={'decBtn-'+att}
					/>
				);
			} else {
				//special stats go here later
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
										{attributeElements.incrementButtons}
										<td></td>
									</tr>
									<tr className={pointsLeft < 0 ? 'table-danger':''}>
										{attributeElements.displayAttribute}
										<td>
											{pointsLeft}
										</td>
									</tr>
									<tr>
										{attributeElements.decrementButtons}
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
