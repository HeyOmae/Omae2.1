import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../ModalButtonComponent';
import priorityData from '../../data/priority.json';

const coreMetatypes = ['human', 'elf', 'dwarf', 'ork', 'troll'];

class MetatypeDataCell extends React.Component {
	componentWillMount() {
		const {rating} = this.props,
			displayMetatypes = [],
			metaInModal = [];
		Object.keys(priorityData[rating].metatype).forEach((race) => {
			const special = priorityData[rating].metatype[race].special,
				karma = priorityData[rating].metatype[race].karma,
				metatypeElement = <li key={race + rating}>{race} ({special}) {karma ? `K: ${karma}` : ''}</li>;

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
					className="prioritytable--btn-select btn btn-link"
					onClick={() => {
						changePriority({
							type: 'SET_PRIORITY',
							category: 'metatype',
							rating,
						});
					}}>
					<ul>
						{displayMetatypes}
					</ul>
				</button>
				<Modal modalName={`Extra Options ${rating}`} modalContent={<ul>{metaInModal}</ul>} />
			</td>
		);
	}
}

MetatypeDataCell.propTypes = {
	changePriority: PropTypes.func.isRequired,
	active: PropTypes.bool.isRequired,
	rating: PropTypes.string.isRequired,
};

export default MetatypeDataCell;
