import React from 'react';
import PropTypes from 'prop-types';
import cyberwareData from '../../data/cyberware.json';
import CyberlimbComponent, {CyberLimbHeader} from './cyberware/CyberlimbComponent';
import DisplayTable from '../DisplayTableComponent';

class AugmentationComponent extends React.PureComponent {
	componentWillMount() {
		const checkCyberlimbLocation = (name) => {
				switch (true) {
				case /Leg|Foot|Liminal/.test(name):
					return 'Legs';
				case /Arm|Hand/.test(name):
					return 'Arms';
				case /Torso/.test(name):
					return 'Torso';
				case /[S|s]kull/.test(name):
					return 'Skull';
				default:
					return 'default';
				}
			},

			checkCyberlimbType = (name) => {
				switch (true) {
				case /Prosthetic/.test(name):
					return 'Prosthetic';
				case /Synthetic/.test(name):
					return 'Synthetic';
				case /Liminal/.test(name):
					return 'Liminal';
				default:
					return 'Obvious';
				}
			},

			organizeCyberlimbs = (cyberlimbObject, limb) => {
				const limbLocation = checkCyberlimbLocation(limb.name),
					limbType = checkCyberlimbType(limb.name);

				return {
					...cyberlimbObject,
					[limbLocation]: {
						...(cyberlimbObject[limbLocation] || {}),
						[limbType]: [
							...(
								(
									cyberlimbObject[limbLocation]
									&& cyberlimbObject[limbLocation][limbType]
								)
								|| []
							),
							limb
						]
					}
				};
			};

		this.cyberware = cyberwareData.reduce((memo, ware) => {
			return {
				...memo,
				[ware.category]: (
					ware.category === 'Cyberlimb' ?
						organizeCyberlimbs((memo.Cyberlimb || {}), ware)
						:
						[
							...(memo[ware.category] || []),
							ware
						]
				)
			};
		}, {});

		console.log(this.cyberware);
	}

	render() {
		const {Cyberlimb} = this.cyberware;
		const {augmentations} = this.props;
		return (
			<div className="augs">
				{Object.keys(Cyberlimb).map((location) => {
					return (
						<CyberlimbComponent
							key={`cyber-${location}`}
							location={location}
							cyberlimbsByType={Cyberlimb[location]}
						/>
					);
				})}

				{
					augmentations.length > 0 &&
					<div className="purchased-augs">
						<h4>Augmentations</h4>
						<DisplayTable
							header={<CyberLimbHeader />}
							body={
								augmentations.map((aug, index) => {
									return (
										<tr>
											<td>
												<button
													className="btn btn-warning"
													onClick={() => {
														this.props.sellGear({index, category: 'augmentations'});
													}}
												>
												-
												</button>
											</td>
											<td>{aug.name}</td>
											<td>{aug.ess}</td>
											<td>{aug.capacity}</td>
											<td>{aug.avail}</td>
											<td>{aug.cost}</td>
											<td>{aug.source} {aug.page}p</td>
										</tr>
									);
								})
							}
						/>
					</div>
				}
			</div>
		);
	}
}

AugmentationComponent.propTypes = {
	augmentations: PropTypes.arrayOf(
		PropTypes.object.isRequired
	),
	sellGear: PropTypes.func.isRequired
};

AugmentationComponent.defaultProps = {
	augmentations: []
};

export default AugmentationComponent;
