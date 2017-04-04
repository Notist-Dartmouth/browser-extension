import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { StyleSheet, css } from 'aphrodite';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import ButtonFooter from '../ButtonFooter';

const styles = StyleSheet.create({
  formElement: {
    textAlign: 'center',
    padding: '10px',
  },
  textField: {
    width: '200px',
  },
});

const GroupForm = props => (
  <div className={css(styles.formElement)}>
    {!props.active && <FlatButton
      primary
      onClick={props.onToggleActive}
      label="Create Group"
      icon={<SocialGroupAdd />}
    />}
    <div hidden={!props.active}>
      <TextField
        id="name"
        className={css(styles.textField)}
        onChange={props.onChange}
        hintText="Group name"
        errorText={props.validName ? '' : 'Group name is required'}
      />
      <TextField
        id="description"
        className={css(styles.textField)}
        onChange={props.onChange}
        hintText="Description"
        multiLine
      />
      <ButtonFooter
        primaryText="Submit"
        onPrimaryClicked={props.onSubmit}
        secondaryText="Cancel"
        onSecondaryClicked={props.onToggleActive}
      />
    </div>
  </div>
);

GroupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onToggleActive: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  validName: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
};

export default GroupForm;
