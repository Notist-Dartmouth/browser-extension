import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import _ from 'underscore';
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
      onChange={props.active ? null : props.onChange}
    >
      <div
        style={styles.header}
        hidden={!props.active && props.groups.length === 0}
      >
        <span>{props.active ? 'New Group' : 'My Groups'}</span>
      </div>
      <div hidden={props.active} >
        {props.groups.map(group => (
          <MenuItem
            key={group._id}
            value={group._id}
            checked={_.indexOf(props.selectedGroups, group._id) > -1}
            primaryText={group.name}
            secondaryText={group.description}
          />
        ))}
      </div>
      <GroupFormContainer
        active={props.active}
        onNewGroupClicked={props.onNewGroupClicked}
      />
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
  active: PropTypes.bool.isRequired,
  onNewGroupClicked: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedGroups: PropTypes.arrayOf(PropTypes.string),
};

GroupDropdown.defaultProps = {
  groups: [],
  selectedGroups: [],
};

export default GroupDropdown;
