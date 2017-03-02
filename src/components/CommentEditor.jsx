import React, { PropTypes } from 'react';
import { Editor, RichUtils } from 'draft-js';

class CommentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleStyleCommand = this.handleStyleCommand.bind(this);
  }

  handleKeyCommand(cmd) {
    const newState = RichUtils.handleKeyCommand(this.props.editorState, cmd);
    if (newState) {
      this.props.onChange(newState);
    }
  }

  handleStyleCommand(cmd) {
    const newState = RichUtils.toggleInlineStyle(this.props.editorState, cmd);
    if (newState) {
      this.props.onChange(newState);
    }
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.handleStyleCommand('BOLD')}><strong>B</strong></button>
          <button onClick={this.handleStyleCommand('ITALIC')}><i>I</i></button>
          <button onClick={this.handleStyleCommand('UNDERLINE')}><u>U</u></button>
        </div>
        <Editor
          onChange={this.props.onChange}
          editorState={this.props.editorState}
          handleKeyCommand={this.handleKeyCommand}
        />
      </div>
    );
  }
}

CommentEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CommentEditor;
