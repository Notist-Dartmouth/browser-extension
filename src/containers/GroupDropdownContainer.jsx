import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GroupDropdown from '../components/GroupDropdown/GroupDropdown';
import { selectAnnotationGroups, filterAnnotations } from '../actions';

class GroupDropdownContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleFormSelect = (e, values) => {
      props.dispatch(selectAnnotationGroups(values));
    };
    this.handleFilterSelect = (e, groups) => {
      props.dispatch(filterAnnotations(groups));
    };
    this.handleChipDelete = this.handleChipDelete.bind(this);
    this.handleToggleActive = this.handleToggleActive.bind(this);
  }

  handleChipDelete(key, selectedGroups) {
    const newSelection = selectedGroups.filter(gId => gId !== key);
    if (this.props.isFilter) {
      this.props.dispatch(filterAnnotations(newSelection));
    } else {
      this.props.dispatch(selectAnnotationGroups(newSelection));
    }
  }

  handleToggleActive() {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <GroupDropdown
        label={this.props.label}
        active={this.state.active}
        handleChipDelete={this.handleChipDelete}
        onNewGroupClicked={this.handleToggleActive}
        groups={this.props.groups}
        onChange={this.props.isFilter ? this.handleFilterSelect : this.handleFormSelect}
        selectedGroups={this.props.isFilter ? this.props.groupsFilter : this.props.newAnnotationGroups}
      />
    );
  }
}

GroupDropdownContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    isPublic: PropTypes.bool,
    isPersonal: PropTypes.bool,
  })).isRequired,
  label: PropTypes.string,
  isFilter: PropTypes.bool,
  newAnnotationGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  groupsFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
};

GroupDropdownContainer.defaultProps = {
  label: 'Share with group',
  isFilter: false,
};

function mapStateToProps(state) {
  const { newAnnotation, groupsFilter } = state.articles;
  const { groups } = state.user;
  return {
    newAnnotationGroups: newAnnotation.groups,
    groups,
    groupsFilter,
  };
}

export default connect(mapStateToProps)(GroupDropdownContainer);
