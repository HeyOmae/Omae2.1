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
		return (
			<div className="augs row">
				<div className="augs--head col-md-12">
					<div className="btn-group-vertical">
						<label htmlFor="augs-head-partial" className="btn btn-primary active">
							<input type="radio" name="Partial Cyberskull" id="augs-head-partial" checked /> Partial
						</label>
						<label htmlFor="augs-head-full" className="btn btn-primary active">
							<input type="radio" name="Obvious Skull" id="augs-head-full" checked /> Full
						</label>
					</div>
				</div>
			</div>
		);
	}
}

export default AugmentationComponent;