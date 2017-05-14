import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const ButtonFooter = props => (
  <div style={{ textAlign: 'center' }}>
    <FlatButton
      label={props.secondaryText}
      onClick={props.onSecondaryClicked}
    />
    <FlatButton
      primary
      label={props.primaryText}
      onClick={props.onPrimaryClicked}
    />
  </div>
);

ButtonFooter.propTypes = {
  primaryText: PropTypes.string.isRequired,
  onPrimaryClicked: PropTypes.func.isRequired,
  secondaryText: PropTypes.string.isRequired,
  onSecondaryClicked: PropTypes.func.isRequired,
};

export default ButtonFooter;
