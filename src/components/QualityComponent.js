import React from 'react';
import PropTypes from 'prop-types';
import Modal from './ModalButtonComponent';
import DisplayTable from './DisplayTableComponent';
import FilterTable from './FilterableTable';
import qualityData from '../data/qualities.json';
import propTypeChecking from '../config/propTypeChecking';

class QualityComponent extends React.PureComponent {
	componentWillMount() {
		const { actions } = this.props;

		this.qualitiesTableRow = {
			Positive: [],
			Negative: [],
		};

		const generateQualityTableRow = (quality, button) => {
				return (
					<tr key={`${quality.category}-${quality.name}`}>
						<td>{button}</td>
						<td>{quality.name}</td>
						<td>{quality.karma}</td>
						<td>
							{quality.source} p{quality.page}
						</td>
					</tr>
				);
			},
			generatePurchaseableQualityTableRow = (quality) => {
				const addButton = (
					<button
						className="btn btn-success"
						onClick={() => {
							actions.selectQuality({ newQuality: quality });
							actions.karma({
								karmaPoints: -Number(quality.karma),
							});
						}}
					>
						+
					</button>
				);
				this.qualitiesTableRow[quality.category].push(
					generateQualityTableRow(quality, addButton),
				);
			};
		this.generateSelectedQualityTableRow = (selectQualities) => {
			return selectQualities.map((quality, qualityIndex) => {
				const removeButton = (
					<button
						className="btn btn-warning"
						onClick={() => {
							actions.removeQuality({
								qualityIndex,
								category: quality.category,
							});
							actions.karma({
								karmaPoints: Number(quality.karma),
							});
						}}
					>
						-
					</button>
				);
				return generateQualityTableRow(quality, removeButton);
			});
		};

		qualityData.forEach(generatePurchaseableQualityTableRow);
	}

	render() {
		const { selectedQualities, karma } = this.props,
			{ qualitiesTableRow, generateSelectedQualityTableRow } = this;

		return (
			<div className="quality-component row">
				<div className="col-md-12">
					<h2>Qualities</h2>
					<p>
						<span>
							Karma: <strong>{karma}</strong>
						</span>
						<span
							className={
								selectedQualities.karma.Positive > 25
									? 'text-danger'
									: ''
							}
						>
							{' '}
							Positive:{' '}
							<strong>{selectedQualities.karma.Positive}</strong>
						</span>
						<span
							className={
								selectedQualities.karma.Negative < -25
									? 'text-danger'
									: ''
							}
						>
							{' '}
							Negative:{' '}
							<strong>{selectedQualities.karma.Negative}</strong>
						</span>
					</p>
					<Modal
						modalName="Positive"
						modalContent={
							<QualityTable
								tableRows={qualitiesTableRow.Positive}
							/>
						}
					/>

					<Modal
						modalName="Negative"
						modalContent={
							<QualityTable
								tableRows={qualitiesTableRow.Negative}
							/>
						}
					/>
				</div>
				{selectedQualities.Positive.length > 0 ? (
					<div className="qualities-positive--seleted col-md-6">
						<h3>Positive Qualities</h3>
						<DisplayTable
							header={<QualityHeader buttonType="Remove" />}
							body={generateSelectedQualityTableRow(
								selectedQualities.Positive,
							)}
						/>
					</div>
				) : null}
				{selectedQualities.Negative.length > 0 ? (
					<div className="qualities-negative--seleted col-md-6">
						<h3>Negative Qualities</h3>
						<DisplayTable
							header={<QualityHeader buttonType="Remove" />}
							body={generateSelectedQualityTableRow(
								selectedQualities.Negative,
							)}
						/>
					</div>
				) : null}
			</div>
		);
	}
}

const QualityHeader = ({ buttonType }) => {
	return (
		<tr>
			<th>{buttonType}</th>
			<th>Name</th>
			<th>Karma</th>
			<th>Ref</th>
		</tr>
	);
};

QualityHeader.propTypes = {
	buttonType: PropTypes.string.isRequired,
};

const QualityTable = ({ tableRows }) => {
	const header = <QualityHeader buttonType="Add" />,
		tableData = {
			header,
			body: tableRows,
		};
	return (
		<div className="col">
			<FilterTable tableData={tableData} />
		</div>
	);
};

QualityTable.propTypes = {
	tableRows: PropTypes.arrayOf(PropTypes.element).isRequired,
};

QualityComponent.displayName = 'QualityComponent';

// Uncomment properties you need
QualityComponent.propTypes = {
	actions: propTypeChecking.actions.isRequired,
	selectedQualities: propTypeChecking.quality.isRequired,
	karma: PropTypes.number.isRequired,
};
// QualityComponent.defaultProps = {};

export default QualityComponent;
