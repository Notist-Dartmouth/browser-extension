import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { EditorState } from 'draft-js';
import CommentEditor from './CommentEditor';

class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(editorState) {
    this.setState({ editorState });
  }

  handleSubmit() {
    this.props.onCommentPost(this.props.parentId,
      this.props.articleText,
      this.state.editorState.getCurrentContent());
  }

  render() {
    return (
      <div>
        <CommentEditor onChange={this.handleChange} editorState={this.state.editorState} />
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
