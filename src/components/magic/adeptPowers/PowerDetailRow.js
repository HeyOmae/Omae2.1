import React from 'react';
import PropTypes from 'prop-types';

import {generateAddActionDetails, generateRemoveActionDetails} from './util/AdeptPowersUtil';
import PowerLevelCounter from './PowerLevelCounter';

class PowerDetailRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = { value: '' };

		this.action = this.action.bind(this);
	}

	getValue() {
		return this.state.value;
	}

	updateValue(value) {
		this.setState({ value });
	}

	powerBonus(bonus, name) {
		if (!bonus) {
			return 'N/A';
		}

		const onChange = (e) => {
			this.updateValue(e.target.value);
		};

		const bonusSelector = {
			selectattribute(attributes) {
				const options = [(<option key={`${name}-blank`} />)].concat(attributes.attribute.map((attName) => {
					const lowerCase = attName.toLowerCase();
					return (<option key={`${name}-${lowerCase}`}>({lowerCase})</option>);
				}));

				return (<select key={name} className="form-control" onChange={onChange}>{options}</select>);
			},
			default(thing) {
				return Object.keys(thing).join(', ');
			},
		};

		if (typeof bonus === 'object') {
			// Currently this will blow up, need to figure out if it'll happen and how to do it.
			return Object.keys(bonus).map((effect) => {
				return (bonusSelector[effect] || bonusSelector.default)(bonus[effect]);
			});
		}
		return bonus;
	}

	action(canAdd) {
		const {actions, index, isMystic, power, pointsSpent, maxPoints, add} = this.props;

		if (!add) {
			return actions.removePower(generateRemoveActionDetails(isMystic, power, index, actions.decrementAugmented));
		} else if (canAdd) {
			return actions.addPower(generateAddActionDetails(isMystic, power, pointsSpent, maxPoints, this.getValue(), actions.incrementAugmented));
		}

		return undefined;
	}

	render() {
		const {power, index, pointsSpent, add, maxPoints, isMystic, actions} = this.props;

		const bonusOrOptions = this.powerBonus(power.bonus, power.name);
		const canAdd = Number(power.points) + pointsSpent <= maxPoints;

		let symbol = '+';
		let classNames = canAdd ? 'btn-success' : 'disabled btn-danger';
		let levelInfo = power.levels;

		if (!add) {
			classNames = 'btn-warning';
			symbol = '-';

			if (power.levels !== 'N/A') {
				const counterProps = {actions, power, index, pointsSpent, maxPoints, isMystic};
				levelInfo = <PowerLevelCounter {...counterProps} />;
			}
		}

		return (
			<tr key={`power-${index}${power.name}`}>
				<td>
					<button
						className={`btn ${classNames}`}
						onClick={() => {
							this.action(canAdd);
						}}
						>
						{symbol}
					</button>
				</td>
				<td>{levelInfo}</td>
				<td>{power.name}</td>
				<td>{power.points}</td>
				<td>{bonusOrOptions}</td>
				<td>{`${power.source} p${power.page}`}</td>
			</tr>);
	}

}

PowerDetailRow.propTypes = {
	power: PropTypes.shape({
		bonus: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		levels: PropTypes.string.isRequired,
		points: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	index: PropTypes.number.isRequired,
	pointsSpent: PropTypes.number.isRequired,
	add: PropTypes.bool,
	maxPoints: PropTypes.number.isRequired,
	isMystic: PropTypes.bool.isRequired,
	actions: PropTypes.shape(
		{
			addPower: PropTypes.func.isRequired,
			removePower: PropTypes.func.isRequired,
		},
	).isRequired,
};

PowerDetailRow.defaultProps = {
	add: false,
};

export default PowerDetailRow;
