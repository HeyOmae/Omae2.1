import React from 'react';
import Modal from '../ModalComponent';
import DisplayTable from '../DisplayTableComponent';
import FilterTable from '../FilterableTable';
import powerData from '../data/powers.json';

import 'styles/magic/SpellSelector.sass';

//helper functions
function createPowerCategoryLabel() {
	return(
		<tr className='powers-label'>
			<th>Learn</th>
			<th>Levels</th>
			<th>Power</th>
			<th>Cost</th>
			<th>Bonus</th>
			<th>Ref</th>
		</tr>
	);
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

function createPowerIndividualRow( powerDetails, button, powerID, levels=powerDetails.levels) {
	return(
		<tr key={'power-'+ (powerID) + powerDetails.name}>
			{button}
			<td>{levels}</td>
			<td>{powerDetails.name}</td>
			<td>{powerDetails.points}</td>
			<td>{powerDetails.bonus?powerBonus(powerDetails.bonus, powerDetails.name):'N/A'}</td>
			<td>{powerDetails.source + ' p' + powerDetails.page}</td>
		</tr>
	);
}

function createSelectedPowerIndividualRow( powerDetails, button, powerID, modifyPowers, powerIndex) {
	function raiseLevel() {
		function findLevelCap(name, level) {
			const capOf = {
				'Improved Physical Attribute': 4,
				default: modifyPowers.maxPointPoints
			};

			return level < (capOf[name] || capOf.default);
		}

		let powerName = powerDetails.name.replace(/\((.*?)\)/g, '');
		if(modifyPowers.pointSpent + Number(powerDetails.points) <= modifyPowers.maxPointPoints && findLevelCap(powerName, powerDetails.levels)) {
			modifyPowers.bonusUp(powerName, powerDetails.bonus);
			modifyPowers.raisePower({powerIndex, isMystic: modifyPowers.isMystic});
		}
	}

	function lowerLevel() {
		if(modifyPowers.pointSpent - Number(powerDetails.points) >= 0 && powerDetails.levels > 1){
			modifyPowers.bonusDown(powerDetails.name, powerDetails.bonus);
			modifyPowers.lowerPower({powerIndex, isMystic: modifyPowers.isMystic});
		}
	}

	const levelButton = (
		<div>
			<button className='btn btn-success col-xs-12 col-sm-4' onClick={raiseLevel}>+</button>
			<span className='col-xs-12 col-sm-4'>{powerDetails.levels}</span>
			<button className='btn btn-warning col-xs-12 col-sm-4' onClick={lowerLevel}>-</button>
		</div>
	);

	return createPowerIndividualRow( powerDetails, button, powerID, levelButton);
}

function generatePowerDetailTablesRows(arrayOfPowers, generateBtnFn, modifyPowers) {
	let powerTables = {
			header: createPowerCategoryLabel(),
			body: []
		},
		powerID = 0;

	arrayOfPowers.forEach((power, powerIndex)=>{

		let addPowerButton = (<td>{generateBtnFn(power, powerIndex)}</td>);

		if (modifyPowers && power.levels > 0) {
			powerTables.body.push( createSelectedPowerIndividualRow( power, addPowerButton, powerID++, modifyPowers, powerIndex) );
		} else {
			powerTables.body.push( createPowerIndividualRow( power, addPowerButton, powerID++));
		}
		
	});

	return powerTables;
}

class PowerSelectorComponent extends React.Component {
	render() {
		const {actions, selectedPowers, pointSpent, maxPointPoints, isMystic, karmaSpent} = this.props,
			{addPower, removePower, incrementAugmented, decrementAugmented, raisePower, lowerPower} = actions;

		function bonusUp(name, bonusToApply) {
			const bonusAction = {
				'Improved Physical Attribute': () => {
					incrementAugmented({attribute: bonusToApply});
				},
				default: () => {
					return null;
				}
			};

			(bonusAction[name]||bonusAction.default)();
		}

		function bonusDown(name, bonusToRemove, decreaseBy) {
			const bonusAction = {
				'Improved Physical Attribute': () => {
					decrementAugmented({attribute: bonusToRemove, decreaseBy});
				},
				default: () => {
					return null;
				}
			};

			(bonusAction[name]||bonusAction.default)();
		}

		let powersToSeletTableRows = [],
			generateAddPowerButton = (power) => {
			let addPowerClick = () => {
				if(pointSpent + Number(power.points) <= maxPointPoints) {
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
							bonusUp(power.name, powerToAdd.bonus);
						}

						if(powerToAdd.levels === 'yes') {
							powerToAdd.levels = 1;
						} else {
							powerToAdd.levels = 'N/A';
						}

					addPower({newSpell: powerToAdd, isMystic});
				}
			};
			
			return (<button className="btn btn-success" onClick={addPowerClick}>+</button>);
		};

		//generated power details to populate addPowerModals
		powersToSeletTableRows = generatePowerDetailTablesRows(powerData, generateAddPowerButton);

		return (
			<div className="powers">
				<p>
					Power Points: <strong>{pointSpent}</strong>
					{isMystic?
					<span> Karma Spent: <strong>{karmaSpent}</strong></span>
					: null}
				</p>
				<div className="power-selector">
					<div className="btn-group">
						<Modal
							key={'powers'}
							modalName="Powers"
							modalContent={
								<PowersTables
									powerData={powersToSeletTableRows}/>
							}
						/>
					</div>
				</div>
				{selectedPowers.length > 0?
					<PowerSelectedDisplay
						selectedPowers={selectedPowers}
						removePower={removePower}
						modifyPowers={{raisePower, lowerPower, pointSpent, maxPointPoints, bonusUp, bonusDown, isMystic}}/>
					: null
				}
			</div>
		);
	}
}

const PowerSelectedDisplay = ({selectedPowers, removePower, modifyPowers}) => {
	let powerTableData = [],
		generateRemovePowerButton = (power, index) => {
			let removePowerClick = () => {
				if(power.bonus !== 'N/A') {
					modifyPowers.bonusDown(power.name.match(/.+?(?=\()/g), power.bonus, power.levels);
				}
				removePower({powerIndex: index, isMystic: modifyPowers.isMystic});
			};
			return (<button className="btn btn-warning" onClick={removePowerClick}>-</button>);
		};

	powerTableData = generatePowerDetailTablesRows(selectedPowers, generateRemovePowerButton, modifyPowers);

	return (
		<div className="selected-powers">
			<h4>Powers</h4>
			<DisplayTable
				header = {powerTableData.header}
				body={powerTableData.body}/>
		</div>
	);
};

const PowersTables = ({powerData}) => {
	return (
		<div className="table-responsive">
			<FilterTable tableData={powerData} />
		</div>
	);
};

export default PowerSelectorComponent;
