import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import GroupForm from '../components/GroupDropdown/GroupForm';
import { createGroup } from '../actions';

class GroupFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      active: false,
      isPublic: false,
      isPersonal: false,
      validName: true,
      description: '',
      visibilitySelected: '',
    };
    this.handleRadioToggle = this.handleRadioToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleActive = this.handleToggleActive.bind(this);
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
    if (e.target.id === 'name') {
      this.setState({ name: newValue });
      if (this.state.name.length > 0) {
        this.setState({ validName: true });
      }
    } else if (e.target.id === 'description') {
      this.setState({ description: newValue });
    }
  }

  handleToggleActive() {
    this.setState({ active: !this.state.active });
  }

  handleSubmit() {
    if (this.state.name.length === 0) {
      this.setState({ validName: false });
      return;
    }
    const { name, description, isPersonal, isPublic } = this.state;
    const newGroup = { name, description, isPersonal, isPublic };
    this.props.dispatch(createGroup(newGroup));
  }

  render() {
    return (
      <GroupForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        onToggleActive={this.handleToggleActive}
        onRadioToggle={this.handleRadioToggle}
        validName={this.state.validName}
        active={this.state.active}
        visibilitySelected={this.state.visibilitySelected}
      />
    );
  }
}

GroupFormContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GroupFormContainer);
