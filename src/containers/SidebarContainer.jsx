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
    this.props.dispatch(fetchUser());
  }

  render() {
    return (<Sidebar isAuthenticated={this.props.isAuthenticated} />);
  }
}

SidebarContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { username, isAuthenticated } = state.user;
  return { username, isAuthenticated };
}

export default connect(mapStateToProps)(SidebarContainer);
