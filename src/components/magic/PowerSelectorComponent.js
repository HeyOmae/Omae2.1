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

function createPowerIndividualRow(powerArray, powerDetails, button, powerID) {
	powerArray.push(
		<tr key={'power-'+ (powerID)}>
			{button}
			<td>{powerDetails.levels === 'yes'? 1 : 'N/A'}</td>
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

class PowerSelectorComponent extends React.Component {
	render() {
		const {addPower, removePower, selectedPowers, powerMax} = this.props;
		let powersToSeletTableRows = [],
			generateAddPowerButton = (power) => {
			let addPowerClick = () => {
				if(powerMax > selectedPowers.length) {
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
						}

					addPower({newSpell: powerToAdd});
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
