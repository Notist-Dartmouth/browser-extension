import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import CommentBox from './CommentBox';

const Annotation = (props) => { //Can go to comment depth of 7
  return (
    <ListItem
      style={{ paddingLeft: 20 * props.depth }}
      primaryText={props.articleText || props.text}
      secondaryText={<CommentBox onCommentPost={props.onCommentPost} parentId={props.id} />}
      nestedItems={props.childAnnotations.map(a =>
        <Annotation {...a} key={a.id} depth={props.depth + 1} onCommentPost={props.onCommentPost} />)}
      nestedListStyle={{ marginLeft: 20, borderLeft: '1px dashed black' }}
    />
  );
};

Annotation.propTypes = {
  articleText: PropTypes.string,
  text: PropTypes.string,
  depth: PropTypes.number,
  childAnnotations: PropTypes.arrayOf(PropTypes.object),
  onCommentPost: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

Annotation.defaultProps = {
  articleText: '',
  text: '',
  depth: 0,
  childAnnotations: [],
};

export default Annotation;
