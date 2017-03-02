import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import { Editor, EditorState } from 'draft-js';
import CommentBox from './CommentBox';

const Annotation = (props) => {
  return (
    <ListItem
      style={{ paddingLeft: 20 * props.depth }}
      secondaryText={<CommentBox onCommentPost={props.onCommentPost} parentId={props.id} />}
      nestedListStyle={{ marginLeft: 20, borderLeft: '1px dashed black' }}
      nestedItems={props.childAnnotations.map(a =>
        <Annotation {...a} key={a.id} depth={props.depth + 1} onCommentPost={props.onCommentPost} />)}
    >
      <div>
        {props.depth === 0 && <div className="article-text">{props.articleText}</div>}
        <br />
        {props.textContent && <Editor readOnly editorState={EditorState.createWithContent(props.textContent)} />}
      </div>
    </ListItem>
  );
};

Annotation.propTypes = {
  articleText: PropTypes.string,
  textContent: PropTypes.object,
  depth: PropTypes.number,
  childAnnotations: PropTypes.arrayOf(PropTypes.object),
  onCommentPost: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

Annotation.defaultProps = {
  articleText: '',
  textContent: null,
  depth: 0,
  childAnnotations: [],
};

export default Annotation;
