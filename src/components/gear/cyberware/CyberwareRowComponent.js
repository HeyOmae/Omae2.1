import React from 'react';
import PropTypes from 'prop-types';
import waregrades from '../../../data/waregrade.json';

class CyberwareRowComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			Rating: 1
		};

		this.evil = eval;

		this.updateRating = this.updateRating.bind(this);
		this.calculateAvail = this.calculateAvail.bind(this);
		this.calculateStat = this.calculateStat.bind(this);
		this.calculateCost = this.calculateCost.bind(this);
		this.purchaseWare = this.purchaseWare.bind(this);
	}

	generateRatingOptions() {
		const ratingOptions = [];

		for (let i = 1; i <= this.props.ware.rating; ++i) {
			ratingOptions.push(
				<option key={`${this.props.ware.name}-${i}`} value={i}>{i}</option>
			);
		}

		return ratingOptions;
	}

	updateRating(event) {
		const { value } = event.target;

		this.setState({
			Rating: +value
		});
	}

	calculateAvail(avail) {
		const restriction = avail.match(/[R|F]$/),
			calculatedAvail = (this.calculateStat(avail) || this.state.Rating) + waregrades[this.props.currentGrade].avail;

		return `${calculatedAvail < 0 ? 0 : calculatedAvail}${restriction || ''}`;
	}

	calculateStat(stat) {
		const {rating} = this.props.ware;
		if (rating && /Rating/.test(stat)) {
			const statSplit = stat.match(/Rating [*] \d+(.\d+)?/),
				{Rating} = this.state;

			return (statSplit && this.evil(statSplit[0].replace('Rating', Rating)));
		}

		return +stat;
	}

	calculateCost(cost) {
		if (/FixedValues/.test(cost)) {
			const {Rating} = this.state,
				fixedCosts = cost.match(/\d+/g);
			return +fixedCosts[Rating - 1];
		}

		return this.calculateStat(cost) * waregrades[this.props.currentGrade].cost;
	}

	calculateEss(ess) {
		return this.calculateStat(ess) * waregrades[this.props.currentGrade].ess;
	}

	purchaseWare() {
		const {purchase, ware} = this.props;
		purchase({
			gear: {
				...ware,
				ess: this.calculateEss(ware.ess),
				avail: this.calculateAvail(ware.avail),
				cost: this.calculateCost(ware.cost)
			},
			category: 'augmentations'
		});
	}

	render() {
		const {name, ess, rating, cost, avail, source, page} = this.props.ware;
		return (
			<tr>
				<td className="cyberware--buy">
					<button
						className="btn btn-success"
						onClick={this.purchaseWare}
					>
						+
					</button>
				</td>
				<td className="cyberware--name">{name}</td>
				<td className="cyberware--ess">{this.calculateEss(ess)}</td>
				<td className="cyberware--rating">{rating ?
					<select onChange={this.updateRating}>
						{this.generateRatingOptions()}
					</select>
					: 'N/A'}</td>
				<td className="cyberware--avail">{this.calculateAvail(avail)}</td>
				<td className="cyberware--cost">{this.calculateCost(cost)}&yen;</td>
				<td className="cyberware--ref">{source} p{page}</td>
			</tr>
		);
	}
}

CyberwareRowComponent.propTypes = {
	ware: PropTypes.shape({
		name: PropTypes.string.isRequired,
		ess: PropTypes.string.isRequired,
		rating: PropTypes.string,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired,
	}).isRequired,
	currentGrade: PropTypes.number.isRequired,
	purchase: PropTypes.func.isRequired
};

export default CyberwareRowComponent;
