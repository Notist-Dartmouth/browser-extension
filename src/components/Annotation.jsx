import React, { PropTypes } from 'react';

export default class Annotation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>this.props.articleText</div>
  }
}

Annotation.propTypes = {
  articleText: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    replies: PropTypes.array,
    upvotes: PropTypes.number,
    downvotes: PropTypes.number
  }))
}
