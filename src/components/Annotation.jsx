import React, { PropTypes } from 'react';

export default class Annotation extends React.Component {
  constructor(props) {
    super(props);
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
