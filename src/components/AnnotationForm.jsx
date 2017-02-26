import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import CommentBox from './CommentBox';

class AnnotationForm extends React.Component {
  render() {
    return (
      <Card>
        <CommentBox onCommentPost={this.props.onCommentPost} />
      </Card>
    );
  }
}

AnnotationForm.propTypes = {
  onCommentPost: PropTypes.func.isRequired,
}

export default AnnotationForm;
