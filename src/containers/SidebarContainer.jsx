import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { fetchAnnotations, fetchUser } from '../actions';

class SidebarContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchAnnotations());
    // TODO: uncomment this once https://github.com/Notist/notist/pull/16 is merged
    // this.props.dispatch(fetchUser());
  }

  render() {
    return (<Sidebar isAuthenticated={this.props.isAuthenticated} />);
  }
}

SidebarContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
}

export default connect(mapStateToProps)(SidebarContainer);
