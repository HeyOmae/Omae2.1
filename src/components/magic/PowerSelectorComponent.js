import React from 'react';
import PropTypes from 'prop-types';
import 'styles/magic/SpellSelector.sass';
import Modal from '../ModalButtonComponent';
import DisplayTable from '../DisplayTableComponent';
import FilterTable from '../FilterableTable';
import powerData from '../../data/powers.json';
import PropTypeChecking from '../../config/propTypeChecking';


// helper functions
function createPowerCategoryLabel() {
	return (
		<tr className="powers-label">
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
			const options = attributes.attribute.map((attName) => {
				const loweCase = attName.toLowerCase();
				return (<option key={`${powerName}-${attName}`}> ({loweCase}) </option>);
			});

			return (<select key={`${powerName}-select-attribute`} className="form-control" ref={`powerOption${powerName}`}>{options}</select>);
		},
		default: (thing) => {
			return Object.keys(thing).join(', ');
		}
	};

	if (typeof boni === 'object') {
		return Object.keys(boni).map((effect) => {
			return (powerBoni[effect] || powerBoni.default)(boni[effect]);
		});
	}
	return boni;
}

function createPowerIndividualRow(powerDetails, button, powerID, levels = powerDetails.levels) {
	return (
		<tr key={`power-${powerID}${powerDetails.name}`}>
			{button}
			<td>{levels}</td>
			<td>{powerDetails.name}</td>
			<td>{powerDetails.points}</td>
			<td>{powerDetails.bonus ? powerBonus(powerDetails.bonus, powerDetails.name) : 'N/A'}</td>
			<td>{`${powerDetails.source} p${powerDetails.page}`}</td>
		</tr>
	);
}

function createSelectedPowerIndividualRow(powerDetails, button, powerID, modifyPowers, powerIndex) {
	function raiseLevel() {
		function findLevelCap(name, level) {
			const capOf = {
				'Improved Physical Attribute': 4,
				default: modifyPowers.maxPointPoints
			};

			return level < (capOf[name] || capOf.default);
		}

		const powerName = powerDetails.name.replace(/\((.*?)\)/g, '');
		if (modifyPowers.pointSpent + Number(powerDetails.points) <= modifyPowers.maxPointPoints && findLevelCap(powerName, powerDetails.levels)) {
			modifyPowers.bonusUp(powerName, powerDetails.bonus);
			modifyPowers.raisePower({powerIndex, isMystic: modifyPowers.isMystic});
		}
	}

	function lowerLevel() {
		if (modifyPowers.pointSpent - Number(powerDetails.points) >= 0 && powerDetails.levels > 1) {
			modifyPowers.bonusDown(powerDetails.name, powerDetails.bonus);
			modifyPowers.lowerPower({powerIndex, isMystic: modifyPowers.isMystic});
		}
	}

	const levelButton = (
		<div>
			<button className="btn btn-success col-12 col-sm-4" onClick={raiseLevel}>+</button>
			<span className="col-12 col-sm-4">{powerDetails.levels}</span>
			<button className="btn btn-warning col-12 col-sm-4" onClick={lowerLevel}>-</button>
		</div>
	);

	return createPowerIndividualRow(powerDetails, button, powerID, levelButton);
}

function generatePowerDetailTablesRows(arrayOfPowers, generateBtnFn, modifyPowers) {
	let powerID = 0;
	const powerTables = {
		header: createPowerCategoryLabel(),
		body: arrayOfPowers.map((power, powerIndex) => {
			const addPowerButton = (<td>{generateBtnFn(power, powerIndex)}</td>);
			++powerID;

			if (modifyPowers && power.levels > 0) {
				return (createSelectedPowerIndividualRow(power, addPowerButton, powerID, modifyPowers, powerIndex));
			}
			return (createPowerIndividualRow(power, addPowerButton, powerID));
		})
	};

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

			(bonusAction[name] || bonusAction.default)();
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

			(bonusAction[name] || bonusAction.default)();
		}

		const generateAddPowerButton = (power) => {
				const addPowerClick = () => {
					if (pointSpent + Number(power.points) <= maxPointPoints) {
						// eslint-disable-next-line react/no-string-refs
						const powerNameOptions = this.refs[`powerOption${power.name}`] ? this.refs[`powerOption${power.name}`].value : '',
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

						if (powerToAdd.levels === 'yes') {
							powerToAdd.levels = 1;
						} else {
							powerToAdd.levels = 'N/A';
						}

						addPower({newSpell: powerToAdd, isMystic});
					}
				};

				return (<button className="btn btn-success" onClick={addPowerClick}>+</button>);
			},
			// generated power details to populate addPowerModals
			powersToSeletTableRows = generatePowerDetailTablesRows(powerData, generateAddPowerButton);

		return (
			<div className="powers">
				<p>
					Power Points: <strong>{pointSpent}</strong>
					{isMystic ?
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
									powerRowData={powersToSeletTableRows} />
							}
						/>
					</div>
				</div>
				{selectedPowers.length > 0 ?
					<PowerSelectedDisplay
						selectedPowers={selectedPowers}
						removePower={removePower}
						modifyPowers={{raisePower, lowerPower, pointSpent, maxPointPoints, bonusUp, bonusDown, isMystic}} />
					: null
				}
			</div>
		);
	}
}

PowerSelectorComponent.propTypes = {
	actions: PropTypeChecking.actions,
	selectedPowers: PropTypes.arrayOf(PropTypes.object).isRequired,
	pointSpent: PropTypes.number.isRequired,
	maxPointPoints: PropTypes.number.isRequired,
	isMystic: PropTypes.bool.isRequired,
	karmaSpent: PropTypes.number.isRequired
};

const PowerSelectedDisplay = ({selectedPowers, removePower, modifyPowers}) => {
	const generateRemovePowerButton = (power, index) => {
			const removePowerClick = () => {
				if (power.bonus !== 'N/A') {
					modifyPowers.bonusDown(power.name.match(/.+?(?=\()/g), power.bonus, power.levels);
				}
				removePower({powerIndex: index, isMystic: modifyPowers.isMystic});
			};
			return (<button className="btn btn-warning" onClick={removePowerClick}>-</button>);
		},
		powerTableData = generatePowerDetailTablesRows(selectedPowers, generateRemovePowerButton, modifyPowers);

	return (
		<div className="selected-powers">
			<h4>Powers</h4>
			<DisplayTable
				header={powerTableData.header}
				body={powerTableData.body} />
		</div>
	);
};

PowerSelectedDisplay.propTypes = {
	selectedPowers: PropTypes.arrayOf(PropTypes.object).isRequired,
	removePower: PropTypes.func.isRequired,
	modifyPowers: PropTypes.shape({
		raisePower: PropTypes.func.isRequired,
		lowerPower: PropTypes.func.isRequired,
		pointSpent: PropTypes.number.isRequired,
		maxPointPoints: PropTypes.number.isRequired,
		bonusUp: PropTypes.func.isRequired,
		bonusDown: PropTypes.func.isRequired,
		isMystic: PropTypes.bool.isRequired
	}).isRequired
};

const PowersTables = ({powerRowData}) => {
	return (
		<div className="col">
			<FilterTable tableData={powerRowData} />
		</div>
	);
};


PowersTables.propTypes = {
	powerRowData: PropTypes.shape({
		header: PropTypes.element.isRequired,
		body: PropTypes.arrayOf(
			PropTypes.element.isRequired
		)
	}).isRequired
};

export default PowerSelectorComponent;
