import React from 'react';
import PropTypes from 'prop-types';
import cyberwareData from '../../data/cyberware.json';
import biowareData from '../../data/bioware.json';
import CyberlimbComponent from './cyberware/CyberlimbComponent';
import Ware from './cyberware/WareComponent';
import PurchasedCyberlimbs from './cyberware/PurchasedCyberlimbComponent';
import PurchasedAugmentation from './cyberware/PurchasedAugmentationComponent';
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
							limb,
						],
					},
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
							ware,
						]
				),
			};
		}, {});

		this.bioware = biowareData.reduce((memo, ware) => {
			return {
				...memo,
				[ware.category]: [
					...(memo[ware.category] || []),
					ware,
				],
			};
		}, {});

		this.cyberwareToNotDisplay = [
			'Cyberlimb',
			'Cyberlimb Accessory',
		];
	}

	render() {
		const {cyberware, bioware} = this,
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
						cyberware={cyberware}
					/>
				}

				<div className="col-12">
					<h3>Cyberware</h3>
					{
						Object.keys(cyberware).reduce((memo, ware) => {
							return this.cyberwareToNotDisplay.indexOf(ware) > -1 ? memo
							: [
								...memo,
								(
									<ModalButton
										key={`cyberware-${ware}`}
										modalName={ware}
										modalContent={
											<Ware wares={cyberware[ware]} />
										}
									/>
								),
							];
						}, [])
					}
				</div>

				<div className="col-12">
					<h3>Bioware</h3>
					{Object.keys(bioware).map((ware) => {
						return (
							<ModalButton
								key={`bioware-${ware}`}
								modalName={ware}
								modalContent={
									<Ware wares={bioware[ware]} />
								}
							/>
						);
					})}
				</div>

				{
					augmentations.length > 0 &&
					<PurchasedAugmentation
						augmentations={augmentations}
						sellAugment={sellGear}
					/>
				}
			</div>
		);
	}
}

AugmentationComponent.propTypes = {
	augmentations: PropTypes.arrayOf(
		PropTypes.object.isRequired,
	),
	cyberlimbs: PropTypes.arrayOf(
		PropTypes.object.isRequired,
	),
	sellGear: PropTypes.func.isRequired,
};

AugmentationComponent.defaultProps = {
	augmentations: [],
	cyberlimbs: [],
};

export default AugmentationComponent;
