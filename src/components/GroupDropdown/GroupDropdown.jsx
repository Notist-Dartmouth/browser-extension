import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import GroupFormContainer from '../../containers/GroupFormContainer';

const styles = {
  dropdown: {
    position: 'relative',
    left: '10%',
    display: 'inline-block',
  },
  header: {
    fontFamily: 'inherit',
    fontSize: '20px',
    lineHeight: '20px',
    color: 'inherit',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

const GroupDropdown = props => (
  <div style={styles.dropdown} >
    <SelectField
      multiple
      value={props.selectedGroups}
      floatingLabelText={props.label}
      onChange={props.onChange}
    >
      <div
        style={styles.header}
        hidden={props.groups.length === 0}
      >
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
    isPublic: PropTypes.bool,
    isPersonal: PropTypes.bool,
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
