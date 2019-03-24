import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LifeStyleRowComponent from './LifeStyleRowComponent';
import LifeStyleData from '../../data/lifestyle.json';
import FilterableTable from '../FilterableTable';
import { purchaseGear } from '../../actions';

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

export class LifeStyleModalContent extends React.PureComponent {
	componentWillMount() {
		const [discard, ...lifestyles] = LifeStyleData.lifestyles.lifestyle;
		this.lifestyles = lifestyles;
	}

	render() {
		return (
			<FilterableTable header={<LifeStyleTableHead />} >
				{
					this.lifestyles.map(lifestyle => (
						<LifeStyleRowComponent
							key={lifestyle.name}
							lifestyle={lifestyle}
							purchaseGear={this.props.purchaseLifestyle}
						/>
					))
				}
			</FilterableTable>
		);
	}
}

LifeStyleModalContent.propTypes = {
	purchaseLifestyle: PropTypes.func.isRequired,
};

export default connect(() => ({}), {purchaseLifestyle: purchaseGear})(LifeStyleModalContent);
