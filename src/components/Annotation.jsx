import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import CommentBox from './CommentBox';

const Annotation = (props) => {
  return (
    <div>
      <ListItem
        primaryText={props.articleText || props.commentText}
        nestedItems={props.childAnnotations.map(a =>
          <Annotation {...a} key={a.id} onCommentPost={props.onCommentPost} />)}
      />
      <CommentBox onCommentPost={props.onCommentPost} annotationId={props.id} />
    </div>
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
