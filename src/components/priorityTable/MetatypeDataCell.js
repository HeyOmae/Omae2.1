import React from 'react';
import Modal from '../ModalComponent';
import priorityData from '../data/priority.json';

const coreMetatypes = ['human', 'elf', 'dwarf', 'ork', 'troll'];

class MetatypeDataCell extends React.Component {
	componentWillMount() {
		const {rating} = this.props,
			displayMetatypes = [],
			metaInModal = [];
		Object.keys(priorityData[rating].metatype).forEach((race) => {
			const special = priorityData[rating].metatype[race].special,
				karma = priorityData[rating].metatype[race].karma,
				metatypeElement = <p key={race + rating}>{race} ({special}) {karma ? `K: ${karma}` : ''}</p>;

			if (coreMetatypes.indexOf(race) > -1) {
				displayMetatypes.push(metatypeElement);
			} else {
				metaInModal.push(metatypeElement);
			}
		});

		this.displayMetatypes = displayMetatypes;
		this.metaInModal = metaInModal;
	}

	render() {
		const {rating, active, changePriority} = this.props,
			{displayMetatypes, metaInModal} = this;
		return (
			<td
				className={active ? 'table-success' : ''}>
				<button
					className="prioritytable--btn-select btn-link"
					onClick={() => {
						changePriority({
							type: 'SET_PRIORITY',
							category: 'metatype',
							rating
						});
					}}>
					{displayMetatypes}
				</button>
				<Modal modalName={`Extra Options ${rating}`} modalContent={metaInModal} />
			</td>
		);
	}
}

MetatypeDataCell.propTypes = {
	changePriority: React.PropTypes.func.isRequired,
	active: React.PropTypes.bool.isRequired,
	rating: React.PropTypes.string.isRequired
};

export default MetatypeDataCell;
