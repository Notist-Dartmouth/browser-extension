import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Frame from 'react-frame-component';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { fetchAnnotations, fetchUser, toggleCollapsed } from '../actions';

class SidebarContainer extends Component {

  componentDidMount() {
    this.props.fetchUserAnnotations();
  }

  render() {
    return (
      <Frame
        style={{
          border: 'none',
          position: 'fixed',
          right: '0px',
          top: '0px',
          left: 'auto',
          zIndex: Number.MAX_SAFE_INTEGER,
          height: '100%',
          transition: '500ms',
          width: this.props.collapsed ? '50px' : '350px',
        }}
      >
        <MuiThemeProvider>
          <Sidebar
            isAuthenticated={this.props.isAuthenticated}
            onCollapsedToggle={this.props.onCollapsedToggle}
            collapsed={this.props.collapsed}
          />
        </MuiThemeProvider>
      </Frame>
    );
  }
}

SidebarContainer.propTypes = {
  fetchUserAnnotations: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onCollapsedToggle: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  const { collapsed } = state.sidebar;
  return { isAuthenticated, collapsed };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserAnnotations: () => {
      dispatch(fetchAnnotations());
      dispatch(fetchUser());
    },
    onCollapsedToggle: () => dispatch(toggleCollapsed()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
