import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';
import { StyleSheet, css } from 'aphrodite';
import marked from 'marked';
import CommentEditor from './CommentEditor';
import ReplyBar from './ReplyBar';

const styles = StyleSheet.create({
  listItem: {
    cursor: 'auto',
    backgroundColor: 'none',
  },
  articleText: {
    fontStyle: 'italic',
    borderLeft: 'thick solid #F98C25',
    paddingLeft: 10,
    paddingBottom: 20,
  },
  expandButton: {
    position: 'absolute',
    bottom: 0,
  },
  commentText: {
    paddingBottom: 20,
  },
});

class Annotation extends React.Component {

  constructor(props) {
    super(props);
    const commentBlocks = convertFromHTML(marked(props.text));
    const commentContentState = ContentState.createFromBlockArray(
      commentBlocks.contentBlocks,
      commentBlocks.entityMap,
    );
    this.state = {
      commentEditorState: EditorState.createWithContent(commentContentState),
      isExpanded: false,
    };
    this.childAnnotations = this.childAnnotations.bind(this);
    this.toggleExpanded = () => this.setState({ isExpanded: !this.state.isExpanded });
  }

  childAnnotations() {
    return this.props.childAnnotations.map(a =>
      <Annotation
        {...a}
        key={a._id}
        depth={this.props.depth + 1}
        onCommentPost={this.props.onCommentPost}
        onCommentToggle={this.props.onCommentToggle}
      />);
  }

  render() {
    return (
      <ListItem
        className={css(styles.listItem)}
        style={{ paddingLeft: 20 * this.props.depth }}
        secondaryText={this.props.newCommentVisible &&
          <CommentEditor
            onCommentPost={this.props.onCommentPost}
            onCommentCancel={() => this.props.onCommentToggle(this.props._id)}
            parent={this.props._id}
          />
        }
        nestedListStyle={{ marginLeft: 20, borderLeft: '1px dashed black' }}
        nestedItems={this.childAnnotations()}
        open={this.state.isExpanded}
        onNestedListToggle={this.toggleExpanded}
      >
        <div>
          {this.props.depth === 0 && <div className={css(styles.articleText)}>{this.props.articleText}</div>}
          <br />
          <div className={css(styles.commentText)}>
            <Editor
              readOnly
              editorState={this.state.commentEditorState}
            />
          </div>
          <ReplyBar onReplyClicked={() => this.props.onCommentToggle(this.props._id)} />
          {
            this.props.childAnnotations.length > 0 && !this.state.isExpanded &&
            <FlatButton
              className={css(styles.expandButton)}
              primary
              onClick={this.toggleExpanded}
              label={`Show Replies (${this.props.childAnnotations.length})`}
            />
          }
        </div>
      </ListItem>
    );
  }
}

Annotation.propTypes = {
  articleText: PropTypes.string,
  text: PropTypes.string,
  depth: PropTypes.number,
  newCommentVisible: PropTypes.bool,
  childAnnotations: PropTypes.arrayOf(PropTypes.object),
  onCommentPost: PropTypes.func.isRequired,
  onCommentToggle: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
};

Annotation.defaultProps = {
  articleText: '',
  text: '',
  depth: 0,
  childAnnotations: [],
  newCommentVisible: false,
};

export default Annotation;
