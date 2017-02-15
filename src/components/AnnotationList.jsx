import React, { PropTypes } from 'react';
import Annotation from './Annotation';
import {List} from 'material-ui/List';

class AnnotationList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        {this.props.annotations.map(a =>
          <Annotation key={a.id} articleText={a.articleText} />
        )}
      </List>
    );
  }

}

AnnotationList.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default AnnotationList;
