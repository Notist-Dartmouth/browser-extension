import React, { PropTypes } from 'react';
import { Editor, EditorState, Modifier, ContentState, convertFromHTML } from 'draft-js';
import marked from 'marked';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ICONS from '../constants/Icons';
import Icon from './Icon';
import GroupDropdownContainer from '../containers/GroupDropdownContainer';
import ButtonFooter from './ButtonFooter';

class CommentEditor extends React.Component {

  static textToMarkdown(text, markdownCmd) {
    switch (markdownCmd) {
      case 'bold':
        return text ? `**${text}**` : '**Bold**';
      case 'italic':
        return text ? `*${text}*` : '*Italic*';
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
    const { articleText, ranges, groups } = this.props.newAnnotation;
    this.props.onCommentPost(this.props.parent,
      articleText,
      ranges,
      this.getMarkdown(),
      groups,
    );
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
          <IconButton
            onClick={() => this.handleStyleCommand('bold')}
          >
            <Icon icon={ICONS.BOLD} />
          </IconButton>
          <IconButton
            onClick={() => this.handleStyleCommand('italic')}
          >
            <Icon icon={ICONS.ITALIC} />
          </IconButton>
          <FlatButton
            onClick={() => this.togglePreview()}
          >
            <Icon icon={ICONS.MARKDOWN} viewBoxSize={1024} />
            {this.state.isPreview ? ' Write' : ' Preview'}
          </FlatButton>
        </div>
        <div style={editorStyle} onClick={() => { this.editor.focus(); }}>
          <Editor
            ref={(editor) => { this.editor = editor; }}
            readOnly={this.state.isPreview}
            stripPastedStyles
            placeholder={'Enter comment'}
            onChange={editorState => this.setState({ editorState })}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleStyleCommand}
          />
        </div>
        {!this.props.parent && <GroupDropdownContainer /> }
        <ButtonFooter
          primaryText="Post"
          onPrimaryClicked={this.handleSubmit}
          secondaryText="Cancel"
          onSecondaryClicked={this.props.onCommentCancel}
        />
      </div>
    );
  }
}

CommentEditor.propTypes = {
  onCommentCancel: PropTypes.func.isRequired,
  onCommentPost: PropTypes.func.isRequired,
  parent: PropTypes.string,
  newAnnotation: PropTypes.shape({
    articleText: PropTypes.string,
    ranges: PropTypes.array,
    groups: PropTypes.array,
  }),
};

CommentEditor.defaultProps = {
  parent: null,
  newAnnotation: {},
};

export default CommentEditor;
