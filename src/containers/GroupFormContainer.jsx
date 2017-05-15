import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GroupForm from '../components/GroupDropdown/GroupForm';
import { createGroup } from '../actions';

class GroupFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isPublic: false,
      isPersonal: false,
      validName: true,
      description: '',
      visibilitySelected: '',
    };
    this.handleRadioToggle = this.handleRadioToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRadioToggle(e, newValue) {
    this.setState({
      isPublic: newValue === 'public' ? !this.state.isPublic : false,
      isPersonal: newValue === 'personal' ? !this.state.isPersonal : false,
      visibilitySelected: (newValue === 'public' && this.state.isPublic) ||
        (newValue === 'personal' && this.state.isPersonal) ? '' : newValue,
    });
  }

  handleChange(e, newValue) {
    e.preventDefault();
    if (e.target.id === 'name') {
      this.setState({ name: newValue });
      if (this.state.name.length > 0) {
        this.setState({ validName: true });
      }
    } else if (e.target.id === 'description') {
      this.setState({ description: newValue });
    }
  }

  handleSubmit() {
    if (this.state.name.length === 0) {
      this.setState({ validName: false });
      return;
    }
    const { name, description, isPersonal, isPublic } = this.state;
    const newGroup = { name, description, isPersonal, isPublic };
    this.props.dispatch(createGroup(newGroup));
    this.props.onNewGroupClicked();
  }

  render() {
    return (
      <GroupForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        onRadioToggle={this.handleRadioToggle}
        validName={this.state.validName}
        active={this.props.active}
        onToggleActive={this.props.onNewGroupClicked}
        visibilitySelected={this.state.visibilitySelected}
      />
    );
  }
}

GroupFormContainer.propTypes = {
  active: PropTypes.bool.isRequired,
  onNewGroupClicked: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GroupFormContainer);
