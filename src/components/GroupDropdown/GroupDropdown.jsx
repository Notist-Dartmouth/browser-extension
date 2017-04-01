import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import GroupFormContainer from '../../containers/GroupFormContainer';
import styles from './GroupDropdown.css';

const GroupDropdown = props => (
  <div className={styles.dropdown} >
    <span className={styles.hintText} >
      Select which groups can view this annotation
    </span>
    <SelectField
      floatingLabelText="Groups"
    >
      <GroupFormContainer />
    </SelectField>
  </div>
);

export default GroupDropdown;
