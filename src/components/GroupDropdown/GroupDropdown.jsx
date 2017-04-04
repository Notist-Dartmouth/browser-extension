import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { StyleSheet, css } from 'aphrodite';
import GroupFormContainer from '../../containers/GroupFormContainer';

const styles = StyleSheet.create({
  dropdown: {
    position: 'relative',
    left: '10%',
    display: 'inline-block',
  },
  header: {
    fontSize: '20px',
    lineHeight: '20px',
    color: 'inherit',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const GroupDropdown = props => (
  <div className={css(styles.dropdown)} >
    <SelectField
      multiple
      value={props.selectedGroups}
      floatingLabelText={props.label}
      onChange={props.onChange}
    >
      <div className={css(styles.header)}>
        <span>Groups</span>
      </div>
      {props.groups.map(group => (
        <MenuItem
          key={group._id}
          value={group._id}
          checked={props.selectedGroups.includes(group._id)}
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
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedGroups: PropTypes.arrayOf(PropTypes.string),
};

GroupDropdown.defaultProps = {
  groups: [],
  selectedGroups: [],
};

export default GroupDropdown;
