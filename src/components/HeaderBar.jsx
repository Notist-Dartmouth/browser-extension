import React from 'react';
import PropTypes from 'prop-types';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

const HeaderBar = props => (
  <AppBar
    style={{ backgroundColor: '#44808C' }}
    title="Notist"
    iconElementLeft={
      <IconButton onClick={props.onOpenToggle}>
        {props.isOpen ? <NavigationChevronRight /> : <NavigationChevronLeft />}
      </IconButton>
    }
  />
);

HeaderBar.propTypes = {
  onOpenToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default HeaderBar;
