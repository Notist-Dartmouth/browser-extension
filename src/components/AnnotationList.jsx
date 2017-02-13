import React, { PropTypes } from 'react';
import Annotation from './Annotation';

class AnnotationList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<ul>
      {this.props.annotations.map(a =>
        <Annotation
          key={a.id}
          articleText={a.articleText}
        />
      )}
    </ul>);
  }

}

AnnotationList.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default AnnotationList;
