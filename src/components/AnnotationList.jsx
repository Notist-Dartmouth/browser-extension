import React, { PropTypes } from 'react';

export default class AnnotationList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<ul>
      {this.props.annotations.map(a => <li key={a.id}>{a.articleText}</li>)}
    </ul>);
  }

}

AnnotationList.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired
}
