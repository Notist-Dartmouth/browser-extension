import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import GroupFormContainer from '../../containers/GroupFormContainer';
import styles from './GroupDropdown.css';

const GroupDropdown = props => (
  <div className={styles.dropdown} >
    <SelectField
      value={props.selectedGroups}
      floatingLabelText={props.label}
      multiple
    >
      {props.groups.map(group => (
        <MenuItem
          key={group._id}
          value={group._id}
          primaryText={group.name}
          secondaryText={group.description}
        />
      ))}
      <GroupFormContainer />
    </SelectField>
  </div>
);

GroupDropdown.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  })),
  label: PropTypes.string,
  selectedGroups: PropTypes.arrayOf(PropTypes.string),
};

GroupDropdown.defaultProps = {
  groups: [],
  label: 'Select groups to post to',
  selectedGroups: null,
};

export default GroupDropdown;
