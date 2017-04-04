import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GroupDropdown from '../components/GroupDropdown/GroupDropdown';
import { selectAnnotationGroups } from '../actions';

class GroupDropdownContainer extends Component {

  constructor(props) {
    super(props);
    this.handleFormSelect = (e, index, values) => props.dispatch(selectAnnotationGroups(values));
    this.handleFilterSelect = (e, index, values) => console.log(`filtering by ${values}`);
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
  })).isRequired,
  label: PropTypes.string,
  isCreatingAnnotation: PropTypes.bool,
};

GroupDropdownContainer.defaultProps = {
  label: 'Select groups to post to',
  isCreatingAnnotation: false,
};

function mapStateToProps(state) {
  // dummy groups
  const mockGroups = [
    {
      _id: '1',
      name: 'notist',
      description: 'cool man i like this',
    },
    {
      _id: '2',
      name: 'peter group',
      description: 'just for me',
    },
  ];
  const { isCreatingAnnotation, newAnnotation } = state.articles;
  return {
    selectedGroups: isCreatingAnnotation ? newAnnotation.groups : [],
    groups: mockGroups,
    isCreatingAnnotation,
  };
}

export default connect(mapStateToProps)(GroupDropdownContainer);
