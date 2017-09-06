import React from 'react';
import PropTypes from 'prop-types';
import armorData from 'data/armor.json';
import Modal from '../../ModalButtonComponent';
import ArmorMods from './ArmorModsComponent';
import FilterTable from '../../FilterableTable';
import DisplayTable from '../../DisplayTableComponent';
import PropTypeChecking from '../../../config/propTypeChecking';
import ArmorTableRow from './ArmorDisplayTableRow';

class ArmorsComponent extends React.PureComponent {
	componentWillMount() {
		const { purchaseGear } = this.props.actions,
			armorRows = armorData.map((armor) => {
				return (
					<ArmorTableRow
						key={`armor-to-buy--${armor.name}`}
						armor={armor}
						btnClass="btn-success"
						btnSymbol="+"
						btnAction={({armor: gear, state}) => {
							return () => {
								purchaseGear({gear, category: 'armors', Rating: state.Rating});
							};
						}}
					/>
				);
			});

		this.armorModal = (
			<Modal
				modalName="Armor"
				modalContent={
					<FilterTable
						tableData={{
							header: <ArmorTableHeader />,
							body: armorRows
						}} />
				} />
		);
	}

	render() {
		const {armorModal} = this,
			{ purchased, actions } = this.props;

		const purchasedTableRow = purchased ?
			purchased.map((armor, index) => {
				return (
					<ArmorTableRow
						key={`${armor.name + index}-purchased`}
						armor={armor}
						mod={
							<Modal
								modalName={armor.name}
								modalContent={
									<ArmorMods
										index={index}
									/>
								} />
						}
						btnClass="btn-warning"
						btnSymbol="-"
						btnAction={() => {
							return () => {
								actions.sellGear({index, category: 'armors'});
							};
						}}
						index={index}
					/>
				);
			})
			: null;
		return (
			<div className="armor-component row">
				{armorModal}
				{purchased ?
					<div className="table-responsive purchased-armors">
						<DisplayTable
							header={<ArmorTableHeader />}
							body={purchasedTableRow} />
					</div>
					: null}
			</div>
		);
	}
}

ArmorsComponent.propTypes = {
	actions: PropTypeChecking.actions.isRequired,
	purchased: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		armor: PropTypes.string.isRequired,
		armorcapacity: PropTypes.string.isRequired,
		avail: PropTypes.string.isRequired,
		cost: PropTypes.string.isRequired,
		source: PropTypes.string.isRequired,
		page: PropTypes.string.isRequired
	}))
};

ArmorsComponent.defaultProps = {
	purchased: null
};

function ArmorTableHeader() {
	return (
		<tr>
			<th>Buy</th>
			<th>Name</th>
			<th>Armor</th>
			<th>Capacity</th>
			<th>Avail</th>
			<th>&yen;</th>
			<th>Ref</th>
		</tr>
	);
}

export default ArmorsComponent;
