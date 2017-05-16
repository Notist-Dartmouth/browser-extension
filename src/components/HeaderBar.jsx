import React from 'react';
import PropTypes from 'prop-types';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

/* eslint-disable */

const HeaderBar = props => (
  <AppBar
    title="Notist"
    iconElementLeft={
      <IconButton onClick={props.onOpenToggle}>
        {props.isOpen ? <NavigationChevronRight /> : <NavigationChevronLeft />}
      </IconButton>
    }
    iconElementRight={
      <FlatButton onClick={(ev) => {
      chrome.runtime.sendMessage({ type: 'RUN_EXPLORE_ALGO' });
      }}>
        Analyze FB!
      </FlatButton>
    }
  />
);

HeaderBar.propTypes = {
  onOpenToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default HeaderBar;
