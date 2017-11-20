import React from 'react';
import PropTypes from 'prop-types';
import cyberwareData from '../../data/cyberware.json';
import CyberlimbComponent from './cyberware/CyberlimbComponent';
import PurchasedCyberlimbs from './cyberware/PurchasedCyberlimbComponent';
import ModalButton from '../ModalButtonComponent';

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
	}

	render() {
		const {cyberware} = this,
			{Cyberlimb} = cyberware,
			{cyberlimbs, augmentations, sellGear} = this.props;

		return (
			<div className="augs row">
				<div className="col-12">
					<h3>Cyberlimbs</h3>
					{Object.keys(Cyberlimb).map((location) => {
						return (
							<ModalButton
								key={`cyber-${location}`}
								modalName={`Cyber${location}`}
								modalContent={
									<CyberlimbComponent
										location={location}
										cyberlimbsByType={Cyberlimb[location]}
									/>
								}
							/>
						);
					})}
				</div>

				{
					cyberlimbs.length > 0 &&
					<PurchasedCyberlimbs
						cyberlimbs={cyberlimbs}
						sellGear={sellGear}
						cyberware={this.cyberware}
					/>
				}

				<div className="col-12">
					<h3>Cyberware</h3>
					{
						Object.keys(cyberware).reduce((memo, ware) => {
							return ware === 'Cyberlimb' ? memo
							: [
								...memo,
								(
									<div key={`cyberware-${ware}`}>
										<p>{ware}</p>
									</div>
								)
							];
						}, [])
					}
				</div>

				{
					augmentations.length > 0 &&
					<div className="purchased-augs col-12">
						<h4>Augmentations</h4>
						{augmentations.map((aug) => {
							return aug.name;
						})}
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
	cyberlimbs: PropTypes.arrayOf(
		PropTypes.object.isRequired
	),
	sellGear: PropTypes.func.isRequired
};

AugmentationComponent.defaultProps = {
	augmentations: [],
	cyberlimbs: []
};

export default AugmentationComponent;
