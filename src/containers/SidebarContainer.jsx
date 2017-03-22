import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import { fetchAnnotations } from '../actions';

class SidebarContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchAnnotations());
  }

  render() {
    return (<Sidebar />);
  }
}

SidebarContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SidebarContainer);
