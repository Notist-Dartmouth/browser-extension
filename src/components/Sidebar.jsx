import React from 'react';
import Annotations from '../containers/Annotations';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = {open: false}
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Toggle Drawer"
          onTouchTap={() => this.setState({open: !this.state.open})}
        />
        <Drawer open={this.state.open} width={300} openSecondary={true} >
          <AppBar title="Notist" />
          <Annotations />
        </Drawer>
      </div>
    );
  }
}
