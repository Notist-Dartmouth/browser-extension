import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'material-ui/Menu';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import _ from 'underscore';
import MenuItem from 'material-ui/MenuItem';
import GroupFormContainer from '../../containers/GroupFormContainer';

const styles = {
  dropdown: {
    position: 'relative',
    left: '5%',
    zIndex: 100,
    display: 'inline-block',
  },
  container: {
    width: '58%',
    display: 'inline-block',
  },
  chip: {
    display: 'inline-block',
  },
  button: {
    textAlign: 'left',
    backgroundColor: '#b6d3d9',
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
    this.getSelectedGroups = this.getSelectedGroups.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.getElementById('notist-sidebar').contentWindow.document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.getElementById('notist-sidebar').contentWindow.document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  getSelectedGroups() {
    return this.props.groups.filter(g => _.indexOf(this.props.selectedGroups, g._id) > -1);
  }

  // Detect whether the user clicks outside of the dropdown
  // based on the answer to this stackoverflow post:
  // http://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isCollapsed: true });
    }
  }

  toggleCollapsed() {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  }

  handleChange(e, values) {
    this.props.onChange(e, values);
  }

  handleBlur(e) {
    console.log(e.target);
    this.setState({ isCollapsed: true });
  }

  render() {
    return (
      <div>
        <div>
          <FlatButton
            label={this.props.label}
            style={styles.button}
            onClick={this.toggleCollapsed}
            labelPosition="before"
            icon={
              <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            }
          />
          <span>
            {this.getSelectedGroups().map(g =>
              (<Chip
                key={g._id}
                onRequestDelete={() => this.props.handleChipDelete(g._id, this.props.selectedGroups)}
              >
                {g.name}
              </Chip>))}
          </span>
        </div>
        {!this.state.isCollapsed &&
        <div
          ref={this.setWrapperRef}
        >
          <Paper
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
          </Paper>
        </div>}
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
  handleChipDelete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedGroups: PropTypes.arrayOf(PropTypes.string),
};

GroupDropdown.defaultProps = {
  groups: [],
  selectedGroups: [],
};

export default GroupDropdown;
