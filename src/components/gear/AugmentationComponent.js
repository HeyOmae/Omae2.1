import React from 'react';
import cyberwareData from '../../data/cyberware.json';

class AugmentationComponent extends React.PureComponent {
	componentWillMount() {
		this.cyberware = cyberwareData.reduce((memo, ware) => {
			return {
				...memo,
				[ware.category]: [
					...(memo[ware.category] || []),
					ware
				]
			};
		}, {});

		console.log(this.cyberware);
	}

	render() {
		return null;
	}
}

export default AugmentationComponent;
