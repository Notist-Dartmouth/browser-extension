import React, { PropTypes, Component } from 'react';
import Menu from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import _ from 'underscore';
import MenuItem from 'material-ui/MenuItem';
import GroupFormContainer from '../../containers/GroupFormContainer';

const styles = {
  dropdown: {
    position: 'relative',
    left: '10%',
    display: 'inline-block',
  },
  header: {
    fontFamily: 'inherit',
    fontSize: '20px',
    lineHeight: '20px',
    color: 'inherit',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};

class GroupDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getGroupNames = this.getGroupNames.bind(this);
  }

  getGroupNames() {
    return this.props.groups.filter(g => _.indexOf(this.props.selectedGroups, g._id) > -1)
      .map(g => g.name).join(', ');
  }

  handleChange(e, values) {
    this.props.onChange(e, values);
    this.toggleCollapsed();
  }

  toggleCollapsed() {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  }

  render() {
    return (
      <div>
        <div>
          <FlatButton
            label={this.props.selectedGroups.length > 0 ? this.getGroupNames() : this.props.label}
            onClick={this.toggleCollapsed}
          />
        </div>
        {!this.state.isCollapsed && <Paper
          zDepth={2}
          style={styles.dropdown}
        >
          <div
            style={styles.header}
            hidden={this.state.isCollapsed}
          >
            <span>{this.props.active ? 'New Group' : 'My Groups'}</span>
          </div>
          <Menu
            multiple
            hidden={this.props.active}
            value={this.props.selectedGroups}
            onChange={this.props.active ? null : this.handleChange}
          >
            {!this.props.active && this.props.groups.map(group => (
              <MenuItem
                key={group._id}
                value={group._id}
                checked={_.indexOf(this.props.selectedGroups, group._id) > -1}
                primaryText={group.name}
              />
            ))}
          </Menu>
          <div>
            <GroupFormContainer
              active={this.props.active}
              onNewGroupClicked={this.props.onNewGroupClicked}
            />
          </div>
        </Paper>}
      </div>
    );
  }
}

GroupDropdown.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    isPublic: PropTypes.bool,
    isPersonal: PropTypes.bool,
  })),
  active: PropTypes.bool.isRequired,
  onNewGroupClicked: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedGroups: PropTypes.arrayOf(PropTypes.string),
};

GroupDropdown.defaultProps = {
  groups: [],
  selectedGroups: [],
};

export default GroupDropdown;
