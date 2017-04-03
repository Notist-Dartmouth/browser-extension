import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

const ButtonFooter = props => (
  <div>
    <FlatButton
      secondary
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