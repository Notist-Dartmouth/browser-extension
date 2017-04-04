import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import GroupFormContainer from '../../containers/GroupFormContainer';
import styles from './GroupDropdown.css';

const GroupDropdown = props => (
  <div className={styles.dropdown} >
    <SelectField
      multiple
      value={props.selectedGroups}
      floatingLabelText={props.label}
      onChange={props.onChange}
    >
      {props.groups.map(group => (
        <MenuItem
          key={group._id}
          value={group._id}
          checked={props.selectedGroups && props.selectedGroups.includes(group)}
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
  onChange: PropTypes.func.isRequired,
  selectedGroups: PropTypes.arrayOf(PropTypes.string),
};

GroupDropdown.defaultProps = {
  groups: [],
  label: 'Select groups to post to',
  selectedGroups: [],
};

export default GroupDropdown;
