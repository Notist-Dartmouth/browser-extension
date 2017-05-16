import React from 'react';
import PropTypes from 'prop-types';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import getAllFriendScores2 from '../lib/scripts/parse';
/* eslint-disable */
import { news_dict, fakenews_dict, pol_dict } from '../lib/scripts/scoring';

const HeaderBar = props => (
  <AppBar
    title="Notist"
    iconElementLeft={
      <IconButton onClick={props.onOpenToggle}>
        {props.isOpen ? <NavigationChevronRight /> : <NavigationChevronLeft />}
      </IconButton>
    }
    iconElementRight={
      <FlatButton onClick={(ev) => { getAllFriendScores2(() => console.log(arguments), () => console.log(arguments)); }}>
        crawl
      </FlatButton>
    }
  />
);

HeaderBar.propTypes = {
  onOpenToggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default HeaderBar;
