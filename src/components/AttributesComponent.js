'use strict';

import React from 'react';
import SpecialComponent from './SpecialComponent';
let metatypeData = require('json!./data/metatype.json'),
	priorityData = require('json!./data/priority.json');

require('styles//Attributes.sass');

class AttributesComponent extends React.Component {
	render() {
		const {priorityRating, metatype, attributes, actions, metatypeRating, magicPriority, magictype} = this.props;
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
			attibutePointsLeft = priorityData[priorityRating].attributes - attributes.baseSpent,
			specialPointsLeft = priorityData[metatypeRating].metatype[metatype].special - attributes.specialSpent;

		const attList = ['bod', 'agi', 'rea', 'str', 'wil', 'log', 'int', 'cha'];

		let oneBaseAttAtMax = false;

		attList.find((att) => {
			let baseAtt = metatypeData[metatype].min[att],
				currentAtt = baseAtt + attributes[att];

			if (currentAtt < metatypeData[metatype].max[att]) {
				return false;
			} else {
				oneBaseAttAtMax = true;
				return true;
			}

		});

		for(let att in metatypeData[metatype].min) {
			let baseAtt = metatypeData[metatype].min[att],
				currentAtt = baseAtt + attributes[att],
				maxAtt = metatypeData[metatype].max[att],
				maxPoints = maxAtt - baseAtt;

			function addingElements(attType, pointsLeft) {
				attributeElements[attType].incBtn.push(
					<IncrementButton
						attributes={attributes}
						attName={att}
						maxPoints={oneBaseAttAtMax && attType==='base' ? maxPoints - 1 : maxPoints}
						pointsLeft={pointsLeft}
						incrementAttribute={actions.incrementAttribute}
						key={'incBtn-'+att}
						attType={attType + 'Spent'}
					/>
				);
				attributeElements[attType].display.push(
					<td key={'display-'+att} className={attributes[att] > maxAtt ? 'table-danger' : ''}>
						{currentAtt}/{maxAtt}{attributes.augmented[att]?`(${attributes.augmented[att]+currentAtt})`:null}
					</td>
				);
				attributeElements[attType].decBtn.push(
					<DecrementButton
						attName={att}
						decrementAttribute={actions.decrementAttribute}
						maxPoints={maxPoints}
						key={'decBtn-'+att}
						attType={attType + 'Spent'}
					/>
				);
			}

			if(attList.indexOf(att) > -1) {
				addingElements('base', attibutePointsLeft);
			} else {
				//special stats go here later
				addingElements('special', specialPointsLeft);

				if(magictype in priorityData[magicPriority].magic && magictype !== 'mundane') {
					att='special';
					baseAtt = priorityData[magicPriority].magic[magictype].attribute.points; //find magic rating
					maxAtt = Math.floor(attributes.ess); //set max to essense rounded down
					maxPoints = maxAtt - baseAtt;
					addingElements('special', specialPointsLeft);
					var magicName = priorityData[magicPriority].magic[magictype].attribute.name;
				}
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
									<tr className={attibutePointsLeft < 0 ? 'table-danger':''}>
										{attributeElements.base.display}
										<td>
											{attibutePointsLeft}
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
					<SpecialComponent
						elements={attributeElements.special}
						pointsLeft={specialPointsLeft}
						magicName={magicName}/>
				</div>
			</div>
		);
	}
}

function activeButton(currentAtt, maxAtt) {
	if(currentAtt > maxAtt) {
		return 'disabled btn-danger';
	} else {
		return 'btn-success';
	}
}

const IncrementButton = ({attributes, attName, maxPoints, pointsLeft, incrementAttribute, attType}) => {
	return (
		<td>
			<button
				className={'btn ' + activeButton(attributes[attName], maxPoints) }
				onClick={() => {
						if(pointsLeft > 0){
							incrementAttribute({
								attribute: attName,
								max: maxPoints,
								spend: attType
							});
						}
					}}
			>
				+
			</button>
		</td>
	);
};

const DecrementButton = ({attName, decrementAttribute, maxPoints, attType}) => {
	return(
		<td>
			<button
				className="btn btn-success"
				onClick={() => {
						decrementAttribute({
							attribute: attName,
							max: maxPoints,
							spend: attType
						});
					}}
			>
				-
			</button>
		</td>
	);
};

AttributesComponent.displayName = 'AttributesComponent';

// Uncomment properties you need
// AttributesComponent.propTypes = {};
// AttributesComponent.defaultProps = {};

export default AttributesComponent;
