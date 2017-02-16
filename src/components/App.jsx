import React from 'react';
import Annotations from '../containers/Annotations';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Drawer>
          <Annotations />
        </Drawer>
      </MuiThemeProvider>
    );
  }
}
