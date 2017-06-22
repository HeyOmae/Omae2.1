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
			<div className="augs">
			<div className="augs--head row">
				<div className="augs--hear__eyes-ears col-md-5">
					<div className="btn-group-vertical">
						<button className="btn btn-info">
							Eyes
						</button>
						<button className="btn btn-info">
							Ears
						</button>
					</div>
				</div>


				<div className="augs--head__skull col-md-2">
					<div className="btn-group-vertical">
						<label htmlFor="augs-head-partial" className="btn btn-primary btn-block active">
							<input type="radio" name="Partial Cyberskull" id="augs-head-partial" checked /> Partial
						</label>
						<label htmlFor="augs-head-full" className="btn btn-primary btn-block">
							<input type="radio" name="Obvious Skull" id="augs-head-full" checked /> Full
						</label>
					</div>
				</div>
			</div>
			<div className="augs--body row">
				<div className="augs--right__right-arm col-md-4">
					<div className="btn-group">
						<label htmlFor="augs-right-none" className="btn btn-primary btn-block active">
							<input type="radio" name="Hand" id="augs-right-none" checked /> None
						</label>
						<label htmlFor="augs-right-hand" className="btn btn-primary btn-block active">
							<input type="radio" name="Hand" id="augs-right-hand" checked /> Hand
						</label>
						<label htmlFor="augs-right-lower" className="btn btn-primary btn-block">
							<input type="radio" name="Lower" id="augs-right-lower" checked /> Lower
						</label>
						<label htmlFor="augs-right-arm" className="btn btn-primary btn-block">
							<input type="radio" name="Arm" id="augs-right-arm" checked /> Arm
						</label>
					</div>
				</div>

				<div className="augs--left__left-arm col-md-4">
					<div className="btn-group">
						<label htmlFor="augs-left-arm" className="btn btn-primary btn-block">
							<input type="radio" name="Arm" id="augs-left-arm" checked /> Arm
						</label>
						<label htmlFor="augs-left-lower" className="btn btn-primary btn-block">
							<input type="radio" name="Lower" id="augs-left-lower" checked /> Lower
						</label>
						<label htmlFor="augs-left-hand" className="btn btn-primary btn-block active">
							<input type="radio" name="Hand" id="augs-left-hand" checked /> Hand
						</label>
						<label htmlFor="augs-left-none" className="btn btn-primary btn-block active">
							<input type="radio" name="Hand" id="augs-left-none" checked /> None
						</label>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default AugmentationComponent;
