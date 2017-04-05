import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { StyleSheet, css } from 'aphrodite';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
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
  label: {
    fontSize: '18px',
    fontFamily: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    padding: '10px',
  },
  radioLabel: {
    fontSize: '14px',
    fontFamily: 'inherit',
  },
  radioButton: {
    padding: '5px',
    width: '60%',
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
      <div className={css(styles.label)}>
        <span>Group Type</span>
      </div>
      <RadioButtonGroup
        id="visibility"
        name="visibility"
        defaultSelected="personal"
        onChange={props.onChange}
      >
        <RadioButton
          className={css(styles.radioButton)}
          value="public"
          label="Public"
          labelStyle={styles.radioLabel}
          onChange={props.onChange}
        />
        <RadioButton
          className={css(styles.radioButton)}
          value="personal"
          label="Personal"
          labelStyle={styles.radioLabel}
        />
      </RadioButtonGroup>
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
  visibilitySelected: PropTypes.string,
};

GroupForm.defaultProps = {
  visibilitySelected: '',
};

export default GroupForm;
