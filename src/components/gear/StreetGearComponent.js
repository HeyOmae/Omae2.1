import React from 'react';
import WeaponsComponent from './weapon/WeaponsComponent';
import ArmorsComponent from './armor/ArmorsComponent';
import AugmentationComponent from './AugmentationComponent';
import GearComponent from './GearComponent';
import PurchasedGear from './PurchasedGearComponent';
import MechComponent from './mech/MechComponent';
import gearData from '../../data/gear.json';
import mechData from '../../data/vehiclesAndDrones.json';
import PropTypeChecking from '../../config/propTypeChecking';

import '../../styles/gear/StreetGear.scss';

class StreetGearComponent extends React.PureComponent {
	componentWillMount() {
		this.organizedGear = gearData.reduce((gearMemo, gear) => {
			return {
				...gearMemo,
				[gear.category]: [
					...(gearMemo[gear.category] || []),
					gear
				]
			};
		}, {});

		this.organizedMechs = mechData.reduce((mechMemo, mech) => {
			const type = /Drone/.test(mech.category) ? 'drones' : 'vehicles';
			return {
				...mechMemo,
				[type]: {
					...(mechMemo[type] || {}),
					[mech.category]: [
						...((mechMemo[type] && mechMemo[type][mech.category]) || []),
						mech
					]
				}
			};
		}, {});
	}

	render() {
		const {actions, purchaseGear} = this.props,
			purchasedGearComponents = [];
		return (
			<div className="streetgear-component">
				<h3>Weapons</h3>
				<WeaponsComponent
					actions={actions}
					purchased={purchaseGear.weapons} />
				<h3>Armors</h3>
				<ArmorsComponent
					actions={actions}
					purchased={purchaseGear.armors} />
				<h3>Other Gear</h3>
				<div className="modal-thirds row">
					{
						Object.keys(this.organizedGear).sort().map((gearCategory) => {
							const gear = this.organizedGear[gearCategory];

							if (purchaseGear[gearCategory]) {
								purchasedGearComponents.push(
									<PurchasedGear
										key={`purchased-gear-${gearCategory}`}
										purchased={purchaseGear[gearCategory]}
										sellGear={actions.sellGear}
										category={gearCategory}
									/>
								);
							}

							return (
								<GearComponent
									key={`gear-modal-${gearCategory}`}
									gearData={gear}
									category={gearCategory}
									purchaseGear={actions.purchaseGear}
								/>
							);
						})
					}
				</div>
				{purchasedGearComponents}

				<h3>Augmentations</h3>
				<AugmentationComponent
					sellGear={actions.sellGear}
					augmentations={purchaseGear.augmentations}
					cyberlimbs={purchaseGear.cyberlimbs}
				/>

				<MechComponent
					classOfMechs="Vehicles"
					mechsByType={this.organizedMechs.vehicles}
				/>

				<h3>Drones</h3>
				{ Object.keys(this.organizedMechs.drones) }
			</div>
		);
	}
}

StreetGearComponent.displayName = 'StreetGearComponent';

// Uncomment properties you need
StreetGearComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	purchaseGear: PropTypeChecking.purchaseGear
};
StreetGearComponent.defaultProps = {
	purchaseGear: null
};

export default StreetGearComponent;
