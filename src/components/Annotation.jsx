import React, { PropTypes } from 'react';

class Annotation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.articleText}
      </div>
    );
  }
}

Annotation.propTypes = {
  articleText: PropTypes.string.isRequired
}

export default Annotation;
