import React from 'react';
import PropTypes from 'prop-types';
import DisplayTable from '../DisplayTableComponent';
import { GearTableHeader } from './GearComponent';
import GearTableRow from './GearTableDisplayRow';

function PurchasedGear({purchased = [], sellGear, category}) {
	const gearTableRow = purchased.map((gear, index) => (
			<GearTableRow
				key={`${gear.name + index}-purchased`}
				gear={gear}
				btnClass="btn-warning"
				btnSymbol="-"
				btnAction={() => () => {
						sellGear({index, category});
					}}
			/>
		));

	return (
		<div className="col purchased-gear">
			<h4>{category}</h4>
			<DisplayTable
				header={<GearTableHeader />}
				body={gearTableRow} />
		</div>
	);
}

PurchasedGear.propTypes = {
	sellGear: PropTypes.func.isRequired,
	category: PropTypes.string.isRequired,
	purchased: PropTypes.arrayOf(PropTypes.object.isRequired),
};

export default PurchasedGear;
