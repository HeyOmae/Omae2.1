'use strict';

import React from 'react';

require('styles/skills/ActiveSkills.sass');

class ActiveSkillsComponent extends React.Component {
	render() {
		return (
			<div className="activeskills-component">
				<h3>Active Skills</h3>

				<div className="row">
					<div className="col-xs-12">
						<table className='table'>
							<thead>
								<tr>
									<th>Raise</th>
									<th>Rating</th>
									<th>Lower</th>
									<th>Skill Name</th>
									<th>Modifiers</th>
									<th>Dice Pool</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

ActiveSkillsComponent.displayName = 'SkillsActiveSkillsComponent';

// Uncomment properties you need
// ActiveSkillsComponent.propTypes = {};
// ActiveSkillsComponent.defaultProps = {};

export default ActiveSkillsComponent;
