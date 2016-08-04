'use strict';

import React from 'react';
import Modal from './ModalComponent';
const qualityData = require('json!./data/qualities.json');

require('styles//Quality.sass');

class QualityComponent extends React.Component {
	componentWillMount() {
		const {actions} = this.props;

		this.qualitiesTableRow = {
			Positive: [],
			Negative: []
		};

		const generateQualityTableRow = (quality, button) => {
			return (
				<tr key={quality.category + '-' + quality.name}>
					<td>{button}</td>
					<td>{quality.name}</td>
					<td>{quality.karma}</td>
					<td>{quality.source} p{quality.page}</td>
				</tr>
			);
		},
		generatePurchaseableQualityTableRow = (quality)=>{
			const addButton = <button className="btn btn-success" onClick={()=>{
						actions.selectQuality({newQuality: quality});
						actions.karma({karmaPoints: -Number(quality.karma)});
					}}>+</button>;
			this.qualitiesTableRow[quality.category].push(generateQualityTableRow(quality, addButton));
		};
		this.generateSelectedQualityTableRow = (selectQualities) => {
			return selectQualities.map((quality, qualityIndex) => {
				const removeButton = <button
					className="btn btn-warning"
					onClick={()=>{
						actions.removeQuality({qualityIndex, category: quality.category});
						actions.karma({karmaPoints: Number(quality.karma)});
					}}
					>
						-
					</button>;
				return generateQualityTableRow(quality, removeButton);
			});
		};

		qualityData.forEach(generatePurchaseableQualityTableRow);
	}
	render() {
		const {selectedQualities, karma} = this.props;

		return (
			<div className="quality-component row">
				<div className="col-md-12">
					<h2>Qualities</h2>
					<p>
						<span>Karma: <strong>{karma}</strong></span>
						<span className={selectedQualities.karma.Positive > 25 ? 'text-danger': ''}> Positive: <strong>{selectedQualities.karma.Positive}</strong></span>
						<span className={selectedQualities.karma.Negative < -25 ? 'text-danger': ''}> Negative: <strong>{selectedQualities.karma.Negative}</strong></span>
					</p>
					<Modal
						modalName="Positive"
						modalContent={
							<QualityTable
								buttonText="Add"
								tableRows={this.qualitiesTableRow.Positive} />
						}
						/>

					<Modal
						modalName="Negative"
						modalContent={
							<QualityTable
								buttonText="Add"
								tableRows={this.qualitiesTableRow.Negative} />
						}
					/>
				</div>
				{selectedQualities.Positive.length > 0 ?
					<div className="qualities-positive--seleted">
						<h3>Positive Qualities</h3>
						<QualityTable
							buttonText="Remove"
							tableRows={this.generateSelectedQualityTableRow(selectedQualities.Positive)} />
					</div>
					: null
				}
				{selectedQualities.Negative.length > 0 ?
					<div className="qualities-negative--seleted">
						<h3>Negative Qualities</h3>
						<QualityTable
							buttonText="Remove"
							tableRows={this.generateSelectedQualityTableRow(selectedQualities.Negative)} />
					</div>
					: null
				}
			</div>
		);
	}
}

const QualityTable = ({tableRows, buttonText}) => {
	return(
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th>{buttonText}</th>
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
