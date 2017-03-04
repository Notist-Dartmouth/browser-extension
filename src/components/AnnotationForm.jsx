import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CommentEditor from './CommentEditor';

const AnnotationForm = (props) => {
  return (
    <Card hidden={!props.isCreatingAnnotation}>
      <CardTitle title="New Annotation" />
      <CardText>{`"${props.articleText}"`}</CardText>
      <CommentEditor
        articleText={props.articleText}
        onCommentPost={props.onCommentPost}
        onCommentCancel={props.onFormCancel}
      />
    </Card>
  );
};

AnnotationForm.propTypes = {
  onCommentPost: PropTypes.func.isRequired,
  onFormCancel: PropTypes.func.isRequired,
  isCreatingAnnotation: PropTypes.bool.isRequired,
  articleText: PropTypes.string.isRequired,
};

export default AnnotationForm;
