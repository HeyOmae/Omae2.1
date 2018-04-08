import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import waregrades from '../../../data/waregrade.json';
import { selectGrade } from '../../../actions';

class WareGradeComponent extends React.Component {
	constructor(props) {
		super(props);
		this.onGradeChange = this.onGradeChange.bind(this);
	}
	componentWillMount() {
		this.gradeOptions = waregrades.map((grade, index) => {
			return (
				<option
					value={index}
					key={`cyber-${grade.name}`}
					>
					{grade.name}
				</option>
			);
		});
	}

	onGradeChange(e) {
		this.props.changeGrade({grade: Number(e.target.value)});
	}

	render() {
		const {currentGrade} = this.props;
		return (
			<div className="form-group">
				<label
					htmlFor="ware-grade"
				>
					Grade
				</label>
				<select
					id="ware-grade"
					className="form-control custom-select"
					onChange={this.onGradeChange}
					value={currentGrade}
				>
					{this.gradeOptions}
				</select>
			</div>
		);
	}
}

WareGradeComponent.propTypes = {
	changeGrade: PropTypes.func.isRequired,
	currentGrade: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
	return {
		currentGrade: state.augmentation.grade,
	};
};

export default connect(mapStateToProps, {changeGrade: selectGrade})(WareGradeComponent);
