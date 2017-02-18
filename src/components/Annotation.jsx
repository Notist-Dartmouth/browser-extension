import React, { PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import CommentBox from './CommentBox';

const Annotation = (props) => {
  return (
    <ListItem
      primaryText={props.articleText || props.commentText}
      nestedLevel={5}
      insetChildren={true}
      nestedItems={props.childAnnotations.map(a =>
        <Annotation
          key={a.id}
          id={a.id}
          commentText={a.commentText}
          onCommentPost={props.onCommentPost}
        />
      )}
    >
      <CommentBox onCommentPost={props.onCommentPost} annotationId={props.id} />
    </ListItem>
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
