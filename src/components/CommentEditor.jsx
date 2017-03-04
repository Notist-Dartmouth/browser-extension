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

  componentDidMount() {
    this.editor.focus();
  }

  getSelectedText() {
    const selectionState = this.props.editorState.getSelection();
    if (selectionState.isCollapsed()) {
      return null;
    }
    const content = this.props.editorState.getCurrentContent();
    const startBlock = content.getBlockForKey(
      selectionState.isBackward ? selectionState.focusKey : selectionState.anchorKey);
    const endBlock = content.getBlockForKey(
      selectionState.isBackward ? selectionState.anchorKey : selectionState.focusKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();

    if (selectionState.anchorKey === selectionState.focusKey) {
      return startBlock.getText().slice(start, end);
    }

    let selectedText = startBlock.getText().slice(selectionState.getStartOffset());
    let currentBlock = content.getBlockAfter(startBlock.getKey()).getKey();
    while (currentBlock !== endBlock.getKey()) {
      const blockText = content.getBlockForKey(currentBlock).getText();
      selectedText = selectedText.concat(blockText);
      currentBlock = content.getBlockAfter(currentBlock).getKey();
    }
    return selectedText.concat(endBlock.getText().slice(0, selectionState.getEndOffset()));
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
      cursor: 'text',
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
        <div style={editorStyle} onClick={() => { this.editor.focus(); }}>
          <Editor
            ref={(editor) => { this.editor = editor; }}
            stripPastedStyles={true}
            placeholder={'Enter comment'}
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
