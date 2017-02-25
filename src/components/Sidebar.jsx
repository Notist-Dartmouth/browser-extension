import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';
import Annotations from '../containers/Annotations';

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
              <IconButton onClick={() => this.setState({open: !this.state.open})}>
                {this.state.open ? <NavigationChevronRight /> : <NavigationChevronLeft />}
              </IconButton>
            }
          />
          <Annotations />
        </Drawer>
      </div>
    );
  }
}
