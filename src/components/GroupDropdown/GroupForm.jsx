import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import ButtonFooter from '../ButtonFooter';

const styles = {
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
};

const GroupForm = props => (
  <div style={styles.formElement}>
    {!props.active && <FlatButton
      primary
      onClick={props.onToggleActive}
      label="Create Group"
      icon={<SocialGroupAdd />}
    />}
    <div hidden={!props.active}>
      <TextField
        id="name"
        onChange={props.onChange}
        hintText="Group name"
        errorText={props.validName ? '' : 'Group name is required'}
      />
      <TextField
        id="description"
        onChange={props.onChange}
        hintText="Description"
        multiLine
      />
      <div style={styles.label}>
        <span>Group Type</span>
      </div>
      <RadioButtonGroup
        name="visibility"
        valueSelected={props.visibilitySelected}
        onChange={props.onRadioToggle}
      >
        <RadioButton
          style={styles.radioButton}
          value="public"
          label="Public"
          labelStyle={styles.radioLabel}
        />
        <RadioButton
          style={styles.radioButton}
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
  onRadioToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  validName: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  visibilitySelected: PropTypes.string,
};

GroupForm.defaultProps = {
  visibilitySelected: '',
};

export default GroupForm;
