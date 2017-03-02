import React, { PropTypes } from 'react';
import { Editor } from 'draft-js';

const CommentEditor = (props) => {
  return (
    <Editor onChange={props.onChange} editorState={props.editorState} />
  );
};

CommentEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CommentEditor;
