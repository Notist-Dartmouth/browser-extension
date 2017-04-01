import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import styles from './GroupDropdown.css';

const GroupForm = props => (
  <div className={styles.formElement}>
    <RaisedButton
      label="Create Group"
      icon={<SocialGroupAdd />}
    />
    <TextField
      hintText="Group name"
    />
  </div>
);

export default GroupForm;
