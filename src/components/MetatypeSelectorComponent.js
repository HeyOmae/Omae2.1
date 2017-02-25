import React from 'react';
import 'styles/MetatypeSelector.sass';
import metatypeData from './data/metatype.json';
import priorityData from './data/priority.json';

class MetatypeSelectorComponent extends React.PureComponent {
	render() {
		const {priorityRating, metatype, action, karma} = this.props,
			currentMetaData = metatypeData[metatype.typeName],
			karmaOldCost = priorityData[metatype.priority].metatype[metatype.typeName].karma || 0,
			priorityMetaData = priorityData[priorityRating].metatype;

		const buttonElements = Object.keys(metatypeData).map((typeName) => {
			return (
				<MetatypeButton
					key={typeName}
					typeName={typeName}
					anOption={typeName in priorityMetaData}
					checked={metatype.typeName === typeName}
					selectMetatypeAction={action}
					priority={priorityRating}
					karma={karma}
					karmaNewCost={(priorityMetaData[typeName] && priorityMetaData[typeName].karma) || 0}
					karmaOldCost={karmaOldCost}
				/>
			);
		});

		const racial = metatypeData[metatype.typeName].racial;

		const racialDetails = Object.keys(racial).map((trait) => {
			return (
				<p key={metatype.typeName + trait}>
					<strong>{trait}: </strong>
					{racial[trait]}
				</p>
			);
		});


		return (
			<div className="metatypeselector-component">
				<div className="row">
					<h2>Metatype</h2>
					<div className="col-md-12 table-responsive">
						<table className="table">
							<tbody>
								<tr>
									<td>
										<div className="btn-group">
											{buttonElements}
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-sm-6">
						<h3>Racial Traits</h3>
						{racialDetails}
					</div>
					<div className="col-sm-6">
						<h3>Reference</h3>
						<strong>{currentMetaData.reference.book}</strong> p{currentMetaData.reference.page}
					</div>
				</div>
			</div>
		);
	}
}

const MetatypeButton = ({typeName, anOption, checked, selectMetatypeAction, karma, karmaNewCost, karmaOldCost, priority}) => {
	return (
		<label
			className={`btn
			${(!anOption && checked ? 'btn-danger' : 'btn-primary')}
			${(anOption ? '' : 'disabled')}
			${(checked ? 'active' : '')}`}
			htmlFor={`metatype-${typeName}`}
		>
			<input
				type="radio"
				name="metatype-selector"
				id={`metatype-${typeName}`}
				autoComplete="off"
				checked={checked}
				onChange={() => {
					if (anOption) {
						selectMetatypeAction({
							typeName, 
							priority,
							karmaOldCost,
							karmaNewCost
						});
					}
				}}
			/>
			{typeName}
		</label>
	);
};

MetatypeButton.propTypes = {
	typeName: React.PropTypes.string.isRequired,
	anOption: React.PropTypes.bool.isRequired,
	checked: React.PropTypes.bool.isRequired,
	selectMetatypeAction: React.PropTypes.func.isRequired,
	karma: React.PropTypes.func.isRequired,
	karmaNewCost: React.PropTypes.number.isRequired,
	karmaOldCost: React.PropTypes.number.isRequired,
	priority: React.PropTypes.string.isRequired
};

MetatypeSelectorComponent.displayName = 'MetatypeSelectorComponent';

// Uncomment properties you need
MetatypeSelectorComponent.propTypes = {
	priorityRating: React.PropTypes.string.isRequired,
	metatype: React.PropTypes.shape({
		typeName: React.PropTypes.string.isRequired,
		priority: React.PropTypes.string.isRequired
	}).isRequired,
	action: React.PropTypes.func.isRequired,
	karma: React.PropTypes.func.isRequired
};
// MetatypeSelectorComponent.defaultProps = {};

export default MetatypeSelectorComponent;
