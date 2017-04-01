import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import GroupForm from './GroupForm';
import styles from './GroupDropdown.css';

const GroupDropdown = props => (
  <div className={styles.dropdown} >
    <span className={styles.hintText} >
      Select which groups can view this annotation
    </span>
    <SelectField
      floatingLabelText="Groups"
    >
      <GroupForm />
    </SelectField>
  </div>
);

export default GroupDropdown;
