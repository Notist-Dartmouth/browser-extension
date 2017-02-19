import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import CommentBox from './CommentBox';

const Annotation = (props) => {
  return (
    <ListItem
      primaryText={props.articleText || props.commentText}
      secondaryText={<CommentBox onCommentPost={props.onCommentPost} annotationId={props.id} />}
      nestedItems={props.childAnnotations.map(a =>
        <Annotation {...a} key={a.id} onCommentPost={props.onCommentPost} />)}
    />
  );
};

Annotation.propTypes = {
  articleText: PropTypes.string,
  commentText: PropTypes.string,
  childAnnotations: PropTypes.arrayOf(PropTypes.object),
  onCommentPost: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

Annotation.defaultProps = {
  articleText: '',
  commentText: '',
  childAnnotations: [],
};

export default Annotation;
