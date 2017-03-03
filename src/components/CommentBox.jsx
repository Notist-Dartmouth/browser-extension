import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { EditorState } from 'draft-js';
import CommentEditor from './CommentEditor';

class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.onCommentPost(this.props.parentId,
      this.props.articleText,
      this.state.editorState.getCurrentContent().getPlainText());
  }

  render() {
    return (
      <div>
        <CommentEditor
          onChange={editorState => this.setState({ editorState })}
          editorState={this.state.editorState}
        />
        <RaisedButton
          type="submit"
          onClick={this.handleSubmit}
          label="Post"
        />
      </div>
    );
  }
}

CommentBox.defaultProps = {
  parentId: null,
  articleText: null,
};

CommentBox.propTypes = {
  onCommentPost: PropTypes.func.isRequired,
  parentId: PropTypes.string,
  articleText: PropTypes.string,
};

export default CommentBox;
