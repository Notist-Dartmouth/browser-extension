import React, { PropTypes } from 'react';

class Annotation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        {this.props.articleText}
      </li>
    );
  }
}

Annotation.propTypes = {
  articleText: PropTypes.string.isRequired
}

export default Annotation;
