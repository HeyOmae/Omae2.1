'use strict';

import React from 'react';
import Modal from './ModalComponent';
const qualityData = require('json!./data/qualities.json');

require('styles//Quality.sass');

class QualityComponent extends React.Component {
	render() {
		const {actions, selectedQualities} = this.props;

		console.log(selectedQualities);

		let qualitiesTableRow = {
			Positive: [],
			Negative: []
		};
		qualityData.forEach((quality)=>{
			qualitiesTableRow[quality.category].push(
				<tr key={quality.category + '-' + quality.name}>
					<td><button className="btn btn-success" onClick={()=>{
						actions.selectQuality({newQuality: quality});
					}}>+</button></td>
					<td>{quality.name}</td>
					<td>{quality.karma}</td>
					<td>{quality.source} p{quality.page}</td>
				</tr>
			);
		});
		return (
			<div className="quality-component row">
				<div className="col-md-12">
					<h2>Qualities</h2>
					<Modal
						modalName="Positive"
						modalContent={
							<QualityTable
								tableRows={qualitiesTableRow.Positive} />
						}
						/>

					<Modal
						modalName="Negative"
						modalContent={
							<QualityTable
								tableRows={qualitiesTableRow.Negative} />
						}
					/>
				</div>
				{selectedQualities.Positive ?
					<div className="qualities-positive--seleted table-responsive">
						<table>
							
						</table>
					</div>
					: null
				}
			</div>
		);
	}
}

const QualityTable = ({tableRows}) => {
	return(
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>Add</th>
						<th>Name</th>
						<th>Karma</th>
						<th>Ref</th>
					</tr>
				</thead>
				<tbody>
					{tableRows}
				</tbody>
			</table>
		</div>
	);
};



QualityComponent.displayName = 'QualityComponent';

// Uncomment properties you need
// QualityComponent.propTypes = {};
// QualityComponent.defaultProps = {};

export default QualityComponent;
