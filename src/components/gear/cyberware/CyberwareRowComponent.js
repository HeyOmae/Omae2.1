import React from 'react';
import PropTypes from 'prop-types';

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
		const restriction = avail.match(/[R|F]$/);

		return `${this.calculateStat(avail) || this.state.Rating}${restriction || ''}`;
	}

	calculateStat(stat) {
		const {rating} = this.props.ware;
		if (rating && /Rating/.test(stat)) {
			const statSplit = stat.match(/Rating [*] \d+(.\d+)?/),
				{Rating} = this.state;

			return (statSplit && this.evil(statSplit[0].replace('Rating', Rating)));
		}

		return stat;
	}

	calculateCost(cost) {
		if (/FixedValues/.test(cost)) {
			const {Rating} = this.state,
				fixedCosts = cost.match(/\d+/g);
			return fixedCosts[Rating - 1];
		}

		return this.calculateStat(cost);
	}

	render() {
		const {name, ess, rating, cost, avail, source, page} = this.props.ware;
		return (
			<tr>
				<td className="cyberware--buy">+</td>
				<td className="cyberware--name">{name}</td>
				<td className="cyberware--ess">{this.calculateStat(ess)}</td>
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
	}).isRequired
};

export default CyberwareRowComponent;
