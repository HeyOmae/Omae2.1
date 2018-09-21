import React from 'react';
import PropTypes from 'prop-types';
import waregrades from '../../../data/waregrade.json';
import SelectRating from '../SelectRatingComponent';

class AugmentationRowComponent extends React.Component {
	constructor(props) {
		super(props);

		this.cost = {};

		if (/Variable/.test(props.ware.cost)) {
			const cost = props.ware.cost.match(/\d+/g);
			this.cost = {
				min: +cost[0],
				max: +cost[1],
			};
		}

		this.state = {
			Rating: 1,
			cost: this.cost.min ? '' : undefined,
		};

		this.evil = eval;

		this.updateRating = this.updateRating.bind(this);
		this.changeCost = this.changeCost.bind(this);
		this.calculateAvail = this.calculateAvail.bind(this);
		this.calculateStat = this.calculateStat.bind(this);
		this.calculateStatBasedOffGrade = this.calculateStatBasedOffGrade.bind(this);
		this.purchaseWare = this.purchaseWare.bind(this);
		this.findCost = this.findCost.bind(this);
	}

	updateRating(event) {
		const { value } = event.target;

		this.setState({
			Rating: +value,
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
			const statSplit = stat.match(/Rating [*] \d+(\.\d+)?/),
				{Rating} = this.state;
			return (
				(
					statSplit &&
					this.evil(
						statSplit[0].replace('Rating', Rating),
					)
				) ||
				this.evil(stat.replace('Rating', Rating))
			);
		} else if (/FixedValues/.test(stat)) {
			const {Rating} = this.state,
				fixedValue = stat.match(/\d+(\.\d+)?/g);
			return +fixedValue[Rating - 1];
		}

		return +stat;
	}

	calculateStatBasedOffGrade(stat, type) {
		return this.calculateStat(stat) * waregrades[this.props.currentGrade][type];
	}

	changeCost({target}) {
		this.setState({
			cost: +(+target.value > this.cost.max ? this.cost.max : target.value),
		});
	}

	purchaseWare() {
		const {purchase, ware} = this.props;
		purchase({
			gear: {
				...ware,
				ess: this.calculateStatBasedOffGrade(ware.ess, 'ess'),
				avail: this.calculateAvail(ware.avail),
				cost: this.findCost(),
			},
			category: 'augmentations',
		});
	}

	findCost() {
		if (this.state.cost === undefined) {
			return this.calculateStatBasedOffGrade(this.props.ware.cost, 'cost');
		}
		return this.state.cost < this.cost.min ? this.cost.min : this.state.cost;
	}

	render() {
		const {name, ess, cost, avail, source, page} = this.props.ware;
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
				<td className="cyberware--ess">{this.calculateStatBasedOffGrade(ess, 'ess')}</td>
				<td className="cyberware--rating">
					{
						+this.props.ware.rating > 20 ?
							<input
								type="number"
								className="cyberware--rating__input"
								placeholder={`1-${this.props.ware.rating}`}
								onChange={this.updateRating}
							/>
						:
							<SelectRating item={this.props.ware} updateRating={this.updateRating} />
					}
				</td>
				<td className="cyberware--avail">{this.calculateAvail(avail)}</td>
				<td className="cyberware--cost">
					{
						this.state.cost === undefined ?
							<span>{this.calculateStatBasedOffGrade(cost, 'cost')}&yen;</span>
							:
							<input
								type="number"
								className="cyberware--cost__input form-control"
								placeholder={`${this.cost.min}-${this.cost.max}¥`}
								onChange={this.changeCost}
								value={this.state.cost}
							/>
					}
				</td>
				<td className="cyberware--ref">{source} p{page}</td>
			</tr>
		);
	}
}

AugmentationRowComponent.propTypes = {
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
	purchase: PropTypes.func.isRequired,
};

export default AugmentationRowComponent;
