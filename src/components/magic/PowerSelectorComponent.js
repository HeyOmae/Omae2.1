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
				<th>Levels</th>
				<th>Power</th>
				<th>Cost</th>
				<th>Bonus</th>
				<th>Ref</th>
			</tr>
		);

	return PowersObj;
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

	if(typeof boni === 'object') {
		for(let effect in boni) {
			return (powerBoni[effect]||powerBoni.default)(boni[effect]);
		}
	} else {
		return boni;
	}
}

function createPowerIndividualRow(powerArray, powerDetails, button, powerID) {
	function raiseLevel() {
		console.log('raise');
	}
	function lowerLevel() {
		console.log('lower');
	}
	const levelButton = (
		<div>
			<button className='btn btn-success col-xs-12 col-sm-4' onClick={raiseLevel}>+</button>
			<span className='col-xs-12 col-sm-4'>{powerDetails.levels}</span>
			<button className='btn btn-warning col-xs-12 col-sm-4' onClick={lowerLevel}>-</button>
		</div>
		);
	powerArray.push(
		<tr key={'power-'+ (powerID)}>
			{button}
			<td>{typeof powerDetails.levels === 'number'? levelButton : powerDetails.levels}</td>
			<td>{powerDetails.name}</td>
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

		let addPowerButton = (<td>{generateBtnFn(power, powerIndex)}</td>);

		//need to make a Extended class component to make this work
		powerTables = createPowerIndividualRow(powerTables, power, addPowerButton, powerID++);
	});

	return powerTables;
}

function applyBonus(name, fn, attribute) {
	const bonusToApply = {
		'Improved Physical Attribute': () => {
			debugger;
			fn({attribute: attribute});
		},
		default: () => {
			return null;
		}
	};

	(bonusToApply[name]||bonusToApply.default)();

}

class PowerSelectorComponent extends React.Component {
	render() {
		const {addPower, removePower, incrementAugmented, selectedPowers, pointSpent} = this.props;
		let powersToSeletTableRows = [],
			generateAddPowerButton = (power) => {
			let addPowerClick = () => {
				if(pointSpent < 6) { //replace 6 with magic rating
					let powerNameOptions = this.refs['powerOption'+power.name] ? this.refs['powerOption'+power.name].value : '',
						newName = power.name + powerNameOptions,
						powerToAdd = Object.assign(
							{},
							power,
							{
								name: newName
							}
						);
						if (powerToAdd.bonus) {
							powerToAdd.bonus = powerNameOptions.replace(/[()]/g, '');
							applyBonus(power.name, incrementAugmented, powerToAdd.bonus);
						}

						if(powerToAdd.levels === 'yes') {
							powerToAdd.levels = 1;
						} else {
							powerToAdd.levels = 'N/A';
						}

					addPower({newSpell: powerToAdd});
				}
			};
			
			return (<button className="btn btn-success" onClick={addPowerClick}>+</button>);
		};

		//generated power details to populate addPowerModals
		powersToSeletTableRows = generatePowerDetailTablesRows(powerData, generateAddPowerButton);
console.log(pointSpent);
		return (
			<div className="powers">
				<p><strong>{pointSpent}</strong></p>
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
				{selectedPowers.length > 0?
					<PowerSelectedDisplay
						selectedPowers={selectedPowers}
						removePower={removePower}/>
					: null
				}
			</div>
		);
	}
}

const PowerSelectedDisplay = ({selectedPowers, removePower}) => {
	let powerTableData = [],
		generateRemovePowerButton = (power, index) => {
			let removePowerClick = () => {
				removePower({spellIndex: index});
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
