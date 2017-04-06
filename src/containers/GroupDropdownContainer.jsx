import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GroupDropdown from '../components/GroupDropdown/GroupDropdown';
import { selectAnnotationGroups, filterAnnotations } from '../actions';

class GroupDropdownContainer extends Component {

  constructor(props) {
    super(props);
    this.handleFormSelect = (e, index, values) => {
      if (values && values.length > 0) {
        props.dispatch(selectAnnotationGroups(values));
      }
    };
    this.handleFilterSelect = (e, index, groups) => props.dispatch(filterAnnotations(groups));
  }

  render() {
    return (
      <GroupDropdown
        label={this.props.label}
        groups={this.props.groups}
        onChange={this.props.isCreatingAnnotation ? this.handleFormSelect : this.handleFilterSelect}
        selectedGroups={this.props.selectedGroups}
      />
    );
  }
}

GroupDropdownContainer.propTypes = {
  selectedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    isPublic: PropTypes.bool,
    isPersonal: PropTypes.bool,
  })).isRequired,
  label: PropTypes.string,
  isCreatingAnnotation: PropTypes.bool,
};

GroupDropdownContainer.defaultProps = {
  label: 'Select groups to post to',
  isCreatingAnnotation: false,
};

function mapStateToProps(state) {
  const { isCreatingAnnotation, newAnnotation, groupsFilter } = state.articles;
  const { groups } = state.user;
  return {
    selectedGroups: isCreatingAnnotation ? newAnnotation.groups : groupsFilter,
    groups,
    isCreatingAnnotation,
  };
}

export default connect(mapStateToProps)(GroupDropdownContainer);
