import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import GroupDropdown from '../components/GroupDropdown/GroupDropdown';
import { selectAnnotationGroups } from '../actions';

class GroupDropdownContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = (e, index, values) => {
      console.log(`selected groups: ${values}`);
      props.dispatch(selectAnnotationGroups(values));
    };
  }

  render() {
    return (
      <GroupDropdown
        groups={this.props.groups}
        onChange={this.handleSelect}
        selectedGroups={this.props.selectedGroups}
      />
    );
  }
}

GroupDropdownContainer.propTypes = {
  selectedGroups: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
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
  return {
    selectedGroups: state.articles.newAnnotation.groups,
    groups: mockGroups,
  };
}

export default connect(mapStateToProps)(GroupDropdownContainer);
