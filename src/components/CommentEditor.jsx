import React, { PropTypes } from 'react';
import { Editor, EditorState, Modifier, ContentState, convertFromHTML } from 'draft-js';
import marked from 'marked';
import ICONS from '../constants/icons';
import Icon from './Icon';

class CommentEditor extends React.Component {

  static textToMarkdown(text, markdownCmd) {
    switch (markdownCmd) {
      case 'bold':
        return text ? `**${text}**` : '**Bold**';
      case 'italic':
        return text ? `*${text}*` : '*Italic*';
      case 'link':
        return text ? `[${text}](your-link-here)` : '[](your-link-here)';
      default:
        return text;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isPreview: false,
      markdown: this.props.editorState.getCurrentContent().getPlainText(),
    };
    this.handleStyleCommand = this.handleStyleCommand.bind(this);
    this.getSelectedText = this.getSelectedText.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }

  componentDidMount() {
    this.editor.focus();
  }

  getSelectedText() {
    const selectionState = this.props.editorState.getSelection();
    if (selectionState.isCollapsed()) {
      return '';
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

  togglePreview() {
    const markdown = this.state.isPreview ?
      this.state.markdown :
      this.props.editorState.getCurrentContent().getPlainText();
    const blocks = convertFromHTML(marked(markdown));
    const newContentState = this.state.isPreview ?
      ContentState.createFromText(markdown) :
      ContentState.createFromBlockArray(
        blocks.contentBlocks,
        blocks.entityMap,
      );
    this.props.onChange(EditorState.createWithContent(newContentState));
    this.setState({
      isPreview: !this.state.isPreview,
      markdown,
    });
  }

  handleStyleCommand(cmd) {
    const selectedText = this.getSelectedText();
    const markdown = CommentEditor.textToMarkdown(selectedText, cmd);
    const newContentState = selectedText ?
      Modifier.replaceText(
        this.props.editorState.getCurrentContent(),
        this.props.editorState.getSelection(),
        markdown) :
      Modifier.insertText(this.props.editorState.getCurrentContent(),
        this.props.editorState.getSelection(),
        markdown);
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
          <button onClick={() => this.handleStyleCommand('bold')}>
            <Icon icon={ICONS.BOLD} />
          </button>
          <button onClick={() => this.handleStyleCommand('italic')}>
            <Icon icon={ICONS.ITALIC} />
          </button>
          <button onClick={() => this.handleStyleCommand('link')}>
            <Icon icon={ICONS.LINK} />
          </button>
          <button onClick={() => this.togglePreview()}>
            <Icon icon={ICONS.MARKDOWN} viewBoxSize={1024} />
            {this.state.isPreview ? 'Write' : 'Preview'}
          </button>
        </div>
        <div style={editorStyle} onClick={() => { this.editor.focus(); }}>
          <Editor
            ref={(editor) => { this.editor = editor; }}
            readOnly={this.state.isPreview}
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
