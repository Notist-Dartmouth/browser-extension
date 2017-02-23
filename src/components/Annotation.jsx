import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import CommentBox from './CommentBox';

const Annotation = (props) => {
  return (
    <ListItem
      primaryText={props.articleText || props.text}
      secondaryText={<CommentBox onCommentPost={props.onCommentPost} annotationId={props.id} />}
      nestedItems={props.childAnnotations.map(a =>
        <Annotation {...a} key={a.id} onCommentPost={props.onCommentPost} />)}
    />
  );
};

Annotation.propTypes = {
  articleText: PropTypes.string,
  text: PropTypes.string,
  childAnnotations: PropTypes.arrayOf(PropTypes.object),
  onCommentPost: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

Annotation.defaultProps = {
  articleText: '',
  text: '',
  childAnnotations: [],
};

export default Annotation;
