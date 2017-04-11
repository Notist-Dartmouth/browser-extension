import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';
import { StyleSheet, css } from 'aphrodite';
import marked from 'marked';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import CommentEditor from './CommentEditor';

const styles = StyleSheet.create({
  articleText: {
    fontStyle: 'italic',
    borderLeft: 'thick solid #F98C25',
    paddingLeft: 10,
    paddingBottom: 20,
  },
  commentText: {
    paddingBottom: 20,
  },
  replyBar: {
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  icon: {
    width: 48,
    height: 48,
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
    this.state = { commentEditorState: EditorState.createWithContent(commentContentState) };
    this.childAnnotations = this.childAnnotations.bind(this);
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
          <div className={css(styles.replyBar)}>
            <IconButton
              iconStyle={styles.icon}
              onClick={() => this.props.onCommentToggle(this.props._id)}
              tooltip="Reply"
            >
              <ContentReply />
            </IconButton>
            <IconButton
              iconStyle={styles.icon}
              tooltip="Delete"
            >
              <ActionDelete />
            </IconButton>
          </div>
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
