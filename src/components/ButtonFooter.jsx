import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { css } from 'aphrodite';
import sharedStyles from '../styles';

const ButtonFooter = props => (
  <div>
    <FlatButton
      className={css(sharedStyles.button)}
      label={props.secondaryText}
      onClick={props.onSecondaryClicked}
    />
    <FlatButton
      primary
      className={css(sharedStyles.button)}
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
