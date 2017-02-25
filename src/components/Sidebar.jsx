import React from 'react';
import $ from 'jquery';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
import Annotations from '../containers/Annotations';

class ToolBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false }
    this.onClickB = this.handleClick.bind(this);
    this.onClickI = this.handleClick.bind(this);
    this.onClickU = this.handleClick.bind(this);
  }

  handleClick(event) {
    //  Get the text inside text area and surround it with <bold> </bold>
    var textarea = $('textarea');

    var text = textarea.val(); //If nothing selected

    var sel = textarea.getSelection;
    
    alert("All the text is: " + text + "\nand you selected: " + sel);
  }

  render() {
    return (
      <div>
        <ul>
          <li><button onClick = {this.onClickB}>B</button></li>
          <li><button onClick = {this.onClickI}>I</button></li>
          <li><button onClick = {this.onClickU}>U</button></li>
        </ul>
        <textarea />
      </div>
    );
  }
}


export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = { open: false }
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
          <p className="text">Hello!</p>
          <ToolBar />
        </Drawer>

      </div>
    );
  }
}
