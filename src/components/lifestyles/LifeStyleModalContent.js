import React from 'react';
import PropTypes from 'prop-types';
import LifeStyleRowComponent from './LifeStyleRowComponent';
import LifeStyleData from '../../data/lifestyle.json';
import FilterableTable from '../FilterableTable';

export const LifeStyleTableHead = () => {
	return (
		<tr>
			<th>Select</th>
			<th>Name</th>
			<th>Cost</th>
			<th>Ref</th>
		</tr>
	);
};

class LifeStyleModalContent extends React.PureComponent {
	componentWillMount() {
		const [discard, ...lifestyles] = LifeStyleData.lifestyles.lifestyle;
		this.lifestyles = lifestyles;
	}

	render() {
		return (
			<FilterableTable header={<LifeStyleTableHead />} >
				{
					this.lifestyles.map((lifestyle) => {
						return (
							<LifeStyleRowComponent
								key={lifestyle.name}
								lifestyle={lifestyle}
								purchaseGear={this.props.purchaseGear}
							/>
						);
					})
				}
			</FilterableTable>
		);
	}
}

LifeStyleModalContent.propTypes = {
	purchaseGear: PropTypes.func.isRequired,
};

export default LifeStyleModalContent;
