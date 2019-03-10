import React from 'react';
import PropTypes from 'prop-types';
import LifeStyleRowComponent from './LifeStyleRowComponent';
import LifeStyleData from '../../data/lifestyle.json';
import FilterableTable from 'components/FilterableTable';

export const LifeStyleTableHead = () => {
	return (
		<tr>
			<th>Select</th>
			<th>Name</th>
			<th>¥</th>
			<th>Ref</th>
		</tr>
	);
};

class LifeStyleComponent extends React.PureComponent {
	componentWillMount() {
		const [discard, ...lifestyles] = LifeStyleData.lifestyles.lifestyle;
		this.lifestyles = lifestyles;
	}

	render() {
		return (
			<div className="life-style-component">
				<h3>Life Styles</h3>
				<FilterableTable header={<LifeStyleTableHead />} >
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
				</FilterableTable>
			</div>
		);
	}
}

LifeStyleComponent.propTypes = {
	purchaseGear: PropTypes.func.isRequired,
};

export default LifeStyleComponent;
