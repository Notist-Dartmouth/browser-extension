import React from 'react';
import $ from 'jquery';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
import Annotations from '../containers/Annotations';

const styles = {
  editableDiv: {
    border: '1px solid #ddd',
    minHeight: '100px',
    padding: '5px',
    fontFamily: 'sans-serif',
  },
};

class ToolBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onClickB = this.handleClickB.bind(this);
    this.onClickI = this.handleClickI.bind(this);
    this.onClickU = this.handleClickU.bind(this);
  }

  //  Ideally there should be one function that will look at the data-cmd field and use that in execCommand
  //  Like this: var cmd = $(this).data.cmd;
  //  document.execCommand(cmd, false, null);

  handleClickB(event) {
    document.execCommand('bold', false, null);
  }

  handleClickI(event) {
    document.execCommand('italic', false, null);
  }

  handleClickU(event) {
    document.execCommand('underline', false, null)
  }

  render() {
    return (
      <div>
        <a  id="datacmd" data-cmd="bold" href="#" onClick={this.onClickB}><strong>B</strong></a>
        <a id="datacmd" data-cmd="italic" href="#" onClick={this.onClickI}><i>I</i></a>
        <a id="datacmd" data-cmd="underline" href="#" onClick={this.onClickU}><u>U</u></a>
        <div id="editable" contentEditable="true" style={styles.editableDiv}>
          Write here!
        </div>
      </div>
    );
  }
}


export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = { open: false };
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.state.open}
          openSecondary={true}
          containerStyle={{ width: '300px', right: this.state.open ? 0 : '20px' }}
        >
          <AppBar
            title="Notist"
            iconElementLeft={
              <IconButton onClick={() => this.setState({ open: !this.state.open })}>
                {this.state.open ? <NavigationChevronRight /> : <NavigationChevronLeft />}
              </IconButton>
            }
          />
          <Annotations />
          <ToolBar />
        </Drawer>

      </div>
    );
  }
}
