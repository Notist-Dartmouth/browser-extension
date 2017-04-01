import React from 'react';
import GroupForm from '../components/GroupDropdown/GroupForm';

class GroupFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      active: false,
      validName: true,
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleActive = this.handleToggleActive.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    }
    // TODO: dispatch async action to create group
    console.log(`${this.state.name} created`);
  }

  render() {
    return (
      <GroupForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        onToggleActive={this.handleToggleActive}
        validName={this.state.validName}
        active={this.state.active}
      />
    );
  }
}

export default GroupFormContainer;
