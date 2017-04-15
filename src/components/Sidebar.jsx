import React, { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Card, CardText } from 'material-ui/Card';
import AnnotationListContainer from '../containers/AnnotationListContainer';
import AnnotationFormContainer from '../containers/AnnotationFormContainer';
import HeaderBar from './HeaderBar';

export default class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = { open: true };
  }

  render() {
    return (
      <Drawer
        open={this.state.open}
        openSecondary
        containerStyle={{ width: '300px', right: this.state.open ? 0 : '20px' }}
      >
        <HeaderBar
          onOpenToggle={() => this.setState({ open: !this.state.open })}
          isOpen={this.state.open}
        />
        <Card hidden={this.props.isAuthenticated}>
          <CardText>
            <a
              href={'/* @echo FRONTEND_HOST *//login'}
              style={{ color: 'blue', textDecoration: 'none' }}
            >Login</a> to create and edit annotations.
          </CardText>
        </Card>
        <AnnotationFormContainer />
        <AnnotationListContainer />
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
