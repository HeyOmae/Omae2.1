'use strict';

import React from 'react';
import Modal from '../ModalComponent';
const powerData = require('json!../data/powers.json');

require('styles/magic/SpellSelector.sass');

//helper functions
function createPowerCategoryLabel (PowersObj) {
		const powerLabel = 'powers-label';
		PowersObj.push(
			<tr key={powerLabel} className={powerLabel}>
				<th>Learn</th>
				<th>Rating</th>
				<th>Power</th>
				<th>Cost</th>
				<th>Bonus</th>
				<th>Ref</th>
			</tr>
		);

	return PowersObj;
}

function createPowerNameWithOptions(powerName) {
	let partsOfName = {
		start: '',
		end: '',
		placeholderText: ''
	},
	nameWithNoOptions = powerName.replace(/\[[\s\S]*\]/g, (match, offset, string) => {
		partsOfName.placeholderText = match;
		partsOfName.start = offset === 0 ? '' : string.slice(0, offset);
		partsOfName.end = string.slice(string.indexOf(']') + 1);
		return '';
	});
	if (!partsOfName.start && !partsOfName.end) {
		partsOfName.start = nameWithNoOptions;
	}

	return partsOfName;
}

function powerBonus(boni, powerName) {
	const powerBoni = {
		selectattribute: (attributes) => {
			let options = [];
			attributes.attribute.forEach((attName) => {
				let loweCase = attName.toLowerCase();
				options.push(<option key={powerName+'-'+attName}> ({loweCase}) </option>);
			});

			return (<select className='form-control' ref={'powerOption'+powerName}>{options}</select>);
		},
		default: (thing) => {
			// console.log(powerName, thing);

			return Object.keys(thing).join(', ');
		}
	};

	for(let effect in boni) {
		return (powerBoni[effect]||powerBoni.default)(boni[effect]);
	}
}

function createPowerIndividualRow(powerArray, powerName, powerDetails, button, powerID) {
	powerArray.push(
		<tr key={'power-'+ (powerID)}>
			{button}
			<td>{powerDetails.levels === 'yes'? 1 : 'N/A'}</td>
			<td>{powerName.start}</td>
			<td>{powerDetails.points}</td>
			<td>{powerDetails.bonus?powerBonus(powerDetails.bonus, powerDetails.name):'N/A'}</td>
			<td>{powerDetails.source + ' p' + powerDetails.page}</td>
		</tr>
	);

	return powerArray;
}

function generatePowerDetailTablesRows(arrayOfPowers, generateBtnFn) {
	let powerTables = [],
		powerID = 0;

	powerTables = createPowerCategoryLabel(powerTables);

	arrayOfPowers.forEach((power, powerIndex)=>{

		let powerName = createPowerNameWithOptions(power.name),
			addPowerButton = (<td>{generateBtnFn(power, powerName, powerIndex)}</td>);

		//need to make a Extended class component to make this work
		powerTables = createPowerIndividualRow(powerTables, powerName, power, addPowerButton, powerID++);
	});

	return powerTables;
}

class PowerSelectorComponent extends React.Component {
	render() {
		const {addPower, removePower, selectedPowers, powerMax} = this.props;
		let powersToSeletTableRows = [],
			generateAddPowerButton = (power, powerName) => {
			let addPowerClick = () => {
				if(powerMax > selectedPowers.length) {
					let powerNameOptions = this.refs['powerOption'+power.name] ? this.refs['powerOption'+power.name].value : '',
						newName = powerName.start + powerNameOptions + powerName.end,
						powerToAdd = Object.assign(
							{},
							power,
							{
								name: newName
							}
						);
						if (powerToAdd.bonus) {
							powerToAdd.bonus = powerNameOptions.replace(/[()]/g, '');
						}
					addPower({newPower: powerToAdd});
				}
			};
			
			return (<button className="btn btn-success" onClick={addPowerClick}>+</button>);
		};

		//generated power details to populate addPowerModals
		powersToSeletTableRows = generatePowerDetailTablesRows(powerData, generateAddPowerButton);

		return (
			<div className="powers">
				<div className="power-selector">
					<div className="btn-group">
						<Modal
							key={'powers'}
							modalName="Powers"
							modalContent={
								<PowersTables
									powerRow={powersToSeletTableRows}/>
							}
						/>
					</div>
				</div>
				<PowerSelectedDisplay
						selectedPowers={selectedPowers}
						removePower={removePower}/>
			</div>
		);
	}
}

const PowerSelectedDisplay = ({selectedPowers, removePower}) => {
	let powerTableData = [],
		generateRemovePowerButton = (power, powerName, index) => {
			let removePowerClick = () => {
				removePower({powerIndex: index});
			};
			return (<button className="btn btn-warning" onClick={removePowerClick}>-</button>);
		};

	powerTableData = generatePowerDetailTablesRows(selectedPowers, generateRemovePowerButton);

	return (
		<div className="selected-powers">
			<h4>Powers</h4>
			<PowersTables
				powerRow = {powerTableData}/>
		</div>
	);
};

const PowersTables = ({powerRow}) => {
	return (
		<div className="table-responsive">
			<table className="table">
				<tbody>
					{powerRow}
				</tbody>
			</table>
		</div>
	);
};

export default PowerSelectorComponent;
