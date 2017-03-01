import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CommentBox from './CommentBox';

const AnnotationForm = (props) => {
  return (
    <Card hidden={!props.isCreatingAnnotation}>
      <CardTitle title="New Annotation" />
      <CardText>{`"${props.articleText}"`}</CardText>
      <CommentBox articleText={props.articleText} onCommentPost={props.onCommentPost} />
    </Card>
  );
};

AnnotationForm.propTypes = {
  onCommentPost: PropTypes.func.isRequired,
  isCreatingAnnotation: PropTypes.bool.isRequired,
  articleText: PropTypes.string.isRequired,
};

export default AnnotationForm;
