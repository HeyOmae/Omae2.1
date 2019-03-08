import React from 'react';
import PropTypes from 'prop-types';
import LifeStyleRowComponent from './LifeStyleRowComponent';
import LifeStyleData from '../../data/lifestyle.json';

class LifeStyleComponent extends React.PureComponent {
	componentWillMount() {
		const [discard, ...lifestyles] = LifeStyleData.lifestyles.lifestyle;
		this.lifestyles = lifestyles;
	}

	render() {
		return (
			<div className="life-style-component">
				<h3>Life Styles</h3>
				<table className="table">
					<thead>
						<tr>
							<th>Select</th>
							<th>Name</th>
							<th>¥</th>
							<th>Ref</th>
						</tr>
					</thead>
					<tbody>
						{
							this.lifestyles.map((lifestyle) => {
								return (
									<LifeStyleRowComponent
										key={lifestyle.id}
										lifestyle={lifestyle}
										purchaseGear={this.props.purchaseGear}
									/>
								);
							})
						}
					</tbody>
				</table>
			</div>
		);
	}
}

LifeStyleComponent.propTypes = {
	purchaseGear: PropTypes.func.isRequired,
};

export default LifeStyleComponent;
