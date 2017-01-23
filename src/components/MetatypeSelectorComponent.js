import React from 'react';
import 'styles/MetatypeSelector.sass';
import metatypeData from './data/metatype.json';
import priorityData from './data/priority.json';

class MetatypeSelectorComponent extends React.Component {
	render() {
		const {priorityRating, metatype, action, karma} = this.props;
		let buttonElements = [],
			racialDetails = [],
			currentMetaData = metatypeData[metatype.typeName];

		for (const typeName in metatypeData) {
			const selectedMetatype = metatype.typeName === typeName;
			const priorityMetaData = priorityData[priorityRating].metatype;
			buttonElements.push(
				<MetatypeButton
					typeName={typeName}
					anOption={typeName in priorityMetaData}
					checked={selectedMetatype}
					key={typeName}
					selectMetatypeAction={action}
					priority={priorityRating}
					karma={karma}
					karmaNewCost={(priorityMetaData[typeName] && priorityMetaData[typeName].karma) || 0}
					karmaOldCost={priorityData[metatype.priority].metatype[metatype.typeName].karma || 0}
				/>
			);

			if (selectedMetatype) {
				const racials = metatypeData[typeName].racial;
				for (const trait in racials) {
					racialDetails.push(
						<p key={typeName + trait}>
							<strong>{trait}: </strong>
							{racials[trait]}
						</p>
					);
				}
			}
		}
		return (
			<div className="metatypeselector-component">
				<div className="row">
					<h2>Metatype</h2>
					<div className="col-md-12">
						<div className="btn-group">
							{buttonElements}
						</div>
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
			${(checked ? 'active' : '')}`
		}>
			<input
				type="radio"
				name="metatype-selector"
				id={`metatype-${typeName}`}
				autoComplete="off"
				checked={checked}
				onChange={() => {
					if (anOption) {
						// TODO: This is supershit, find a way to dispatch one action to handle this
						selectMetatypeAction({typeName, priority});
						karma({karmaPoints: karmaOldCost});
						karma({karmaPoints: -karmaNewCost});
					}
				}}
			/>
			{typeName}
		</label>
	);
};

MetatypeSelectorComponent.displayName = 'MetatypeSelectorComponent';

// Uncomment properties you need
// MetatypeSelectorComponent.propTypes = {};
// MetatypeSelectorComponent.defaultProps = {};

export default MetatypeSelectorComponent;
