import React, { PropTypes } from 'react';
import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

class Annotation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ListItem primaryText={this.props.articleText} />
        <TextField hintText="Enter comment" />
      </div>
    );
  }
}

Annotation.propTypes = {
  articleText: PropTypes.string.isRequired
}

export default Annotation;
