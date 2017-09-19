import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../ModalButtonComponent';
import FilterTable from '../FilterableTable';
import DisplayTable from '../DisplayTableComponent';
import GearClass from './GearCreator';
import GearTableRow from './GearTableDisplayRow';

class GearComponent extends React.PureComponent {
	componentWillMount() {
		const {gearData, category, purchaseGear} = this.props;

		const gearRows = gearData.map((gear) => {
			const gearState = new GearClass(gear);
			return (
				<GearTableRow
					key={`gear-to-buy--${gear.name}`}
					gear={gear}
					gearState={gearState}
					button={
						<button
							className="btn btn-success"
							onClick={() => {
								purchaseGear({
									gear: gearState.getGear(),
									category,
									Rating: gearState.getGear().currentRating
								});
							}}
						>
							+
						</button>
					}
				/>
			);
		});

		this.gearModal = (
			<Modal
				modalName={category}
				modalContent={
					<FilterTable
						tableData={{
							header: <GearTableHeader />,
							body: gearRows
						}}
					/>
				}
			/>
		);
	}

	render() {
		return this.gearModal;
	}
}

GearComponent.propTypes = {
	gearData: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			category: PropTypes.string.isRequired,
			avail: PropTypes.string.isRequired,
			cost: PropTypes.string.isRequired,
			source: PropTypes.string.isRequired,
			page: PropTypes.string.isRequired,
		}).isRequired
	).isRequired,
	category: PropTypes.string.isRequired,
	purchaseGear: PropTypes.func.isRequired
};

GearComponent.defaultProps = {
	purchased: null
};

function GearTableHeader() {
	return (
		<tr>
			<th>Buy</th>
			<th>Name</th>
			<th>Rating</th>
			<th>Avail</th>
			<th>&yen;</th>
			<th>Ref</th>
		</tr>
	);
}

function PurchasedGear({purchased, sellGear, category}) {
	const gearTableRow = purchased.map((gear, index) => {
		return (
			<GearTableRow
				key={`${gear.name}-purchased`}
				gear={gear}
				button={
					<button
						className="btn btn-warning"
						onClick={() => {
							sellGear({index, category: gear.category});
						}}
					>
						-
					</button>
			} />
		);
	});

	return (
		<div className="table-responsive purchased-gear">
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
	purchased: PropTypes.arrayOf(PropTypes.object.isRequired)
};

PurchasedGear.defaultProps = {
	purchased: []
};

export {PurchasedGear};

export default GearComponent;
