import React, { PropTypes } from 'react';
import { Editor, EditorState, Modifier } from 'draft-js';
import ICONS from '../constants/icons';
import Icon from './Icon';

class CommentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handleStyleCommand = this.handleStyleCommand.bind(this);
    this.getSelectedText = this.getSelectedText.bind(this);
  }

  getSelectedText() {
    const selectionState = this.props.editorState.getSelection();
    const anchor = selectionState.getAnchorKey();
    const content = this.props.editorState.getCurrentContent();
    const contentBlock = content.getBlockForKey(anchor);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    return contentBlock.getText().slice(start, end);
  }

  handleStyleCommand(cmd) {
    const selectedText = this.getSelectedText();
    const markdown = cmd === 'BOLD' ? '**' : '*';
    const newContentState = selectedText ?
      Modifier.replaceText(
        this.props.editorState.getCurrentContent(),
        this.props.editorState.getSelection(),
        `${markdown}${selectedText}${markdown}`) :
      Modifier.insertText(this.props.editorState.getCurrentContent(),
        this.props.editorState.getSelection(),
        `${markdown}${selectedText}${markdown}`);
    this.props.onChange(EditorState.createWithContent(newContentState));
  }

  render() {
    const editorStyle = {
      border: '1px solid #ddd',
      minHeight: '100px',
      padding: '5px',
      fontFamily: 'sans-serif',
    };

    return (
      <div>
        <div>
          <button onClick={() => this.handleStyleCommand('BOLD')}>
            <Icon icon={ICONS.BOLD} />
          </button>
          <button onClick={() => this.handleStyleCommand('ITALIC')}>
            <Icon icon={ICONS.ITALIC} />
          </button>
          <button>
            <Icon icon={ICONS.LINK} />
          </button>
          <button>
            <Icon icon={ICONS.MARKDOWN} viewBoxSize={1024} />
            Preview
          </button>
        </div>
        <div style={editorStyle}>
          <Editor
            placeholder={'Enter Comment/Annotation'}
            onChange={this.props.onChange}
            editorState={this.props.editorState}
            handleKeyCommand={this.handleStyleCommand}
          />
        </div>
      </div>
    );
  }
}

CommentEditor.propTypes = {
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CommentEditor;
