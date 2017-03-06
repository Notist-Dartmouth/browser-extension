import React, { PropTypes } from 'react';
import { Editor, EditorState, Modifier, ContentState, convertFromHTML } from 'draft-js';
import marked from 'marked';
import RaisedButton from 'material-ui/RaisedButton';
import ICONS from '../constants/Icons';
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
      editorState: EditorState.createEmpty(),
      isPreview: false,
      markdown: '',
    };
    this.handleStyleCommand = this.handleStyleCommand.bind(this);
    this.getSelectedText = this.getSelectedText.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMarkdown = this.getMarkdown.bind(this);
  }

  componentDidMount() {
    this.editor.focus();
  }

  getSelectedText() {
    const selectionState = this.state.editorState.getSelection();
    if (selectionState.isCollapsed()) {
      return '';
    }
    const content = this.state.editorState.getCurrentContent();
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

  getMarkdown() {
    return this.state.isPreview ?
      this.state.markdown :
      this.state.editorState.getCurrentContent().getPlainText();
  }

  handleSubmit() {
    this.props.onCommentPost(this.props.parentId,
      this.props.articleText,
      this.getMarkdown());
    this.setState({
      editorState: EditorState.createEmpty(),
      markdown: '',
    });
    this.props.onCommentCancel();
  }

  togglePreview() {
    const markdown = this.getMarkdown();
    const blocks = convertFromHTML(marked(markdown));
    const newContentState = this.state.isPreview ?
      ContentState.createFromText(markdown) :
      ContentState.createFromBlockArray(
        blocks.contentBlocks,
        blocks.entityMap,
      );
    this.setState({
      editorState: EditorState.createWithContent(newContentState),
      isPreview: !this.state.isPreview,
      markdown,
    });
  }

  handleStyleCommand(cmd) {
    const selectedText = this.getSelectedText();
    const markdown = CommentEditor.textToMarkdown(selectedText, cmd);
    const newContentState = selectedText ?
      Modifier.replaceText(
        this.state.editorState.getCurrentContent(),
        this.state.editorState.getSelection(),
        markdown) :
      Modifier.insertText(this.state.editorState.getCurrentContent(),
        this.state.editorState.getSelection(),
        markdown);
    this.setState({ editorState: EditorState.createWithContent(newContentState) });
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
            onChange={editorState => this.setState({ editorState })}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleStyleCommand}
          />
        </div>
        <div>
          <RaisedButton
            type="submit"
            onClick={this.handleSubmit}
            label="Post"
          />
          <RaisedButton
            onClick={this.props.onCommentCancel}
            label="Cancel"
          />
        </div>
      </div>
    );
  }
}

CommentEditor.propTypes = {
  onCommentCancel: PropTypes.func.isRequired,
  onCommentPost: PropTypes.func.isRequired,
  parentId: PropTypes.string,
  articleText: PropTypes.string,
};

CommentEditor.defaultProps = {
  parentId: null,
  articleText: null,
};

export default CommentEditor;
