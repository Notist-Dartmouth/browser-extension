import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SocialGroupAdd from 'material-ui/svg-icons/social/group-add';
import ButtonFooter from '../ButtonFooter';

const styles = {
  formElement: {
    textAlign: 'left',
    paddingLeft: '15px',
  },
  label: {
    fontSize: '18px',
    paddingLeft: '15px',
    fontFamily: 'inherit',
    color: 'inherit',
    textAlign: 'left',
  },
  radioLabel: {
    fontSize: '18px',
    paddingLeft: '15px',
    fontFamily: 'inherit',
  },
  createButton: {
    backgroundColor: '#b6d3d9',
  },
};

const GroupForm = props => (
  <div style={styles.formElement}>
    {!props.active && <FlatButton
      onClick={props.onToggleActive}
      label="Create Group"
      style={styles.createButton}
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
      <br />
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
