import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CommentEditor from './CommentEditor';

const AnnotationForm = (props) => {
  return (
    <Card hidden={!props.isCreatingAnnotation}>
      <CardTitle title="New Annotation" />
      <CardText>{`"${props.articleSelection.articleText}"`}</CardText>
      <CommentEditor
        articleSelection={props.articleSelection}
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
  articleSelection: PropTypes.shape({
    articleText: PropTypes.string,
    ranges: PropTypes.array,
  }).isRequired,
};

export default AnnotationForm;
