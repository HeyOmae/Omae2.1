import React from 'react';
import PropTypes from 'prop-types';
import cyberwareData from '../../data/cyberware.json';

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
		return (
			<div className="augs">
				{Object.keys(Cyberlimb).map((location) => {
					return (
						<CyberlimbComponent
							location={location}
							cyberlimbsByType={Cyberlimb[location]}
						/>
					);
				})}
			</div>
		);
	}
}

const CyberlimbComponent = ({location, cyberlimbsByType}) => {
	return (
		<div>
			<h4>{location}</h4>
			{Object.keys(cyberlimbsByType).map((type) => {
				return (<button>{type}</button>);
			})}
		</div>
	);
};

CyberlimbComponent.propTypes = {
	location: PropTypes.string.isRequired,
	cyberlimbsByType: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired
			}).isRequired
		).isRequired
	).isRequired
};

export default AugmentationComponent;
