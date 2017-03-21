import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';
import marked from 'marked';
import RaisedButton from 'material-ui/RaisedButton';
import CommentEditor from './CommentEditor';

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
        key={a.id}
        depth={this.props.depth + 1}
        onCommentPost={this.props.onCommentPost}
        onCommentToggle={this.props.onCommentToggle}
      />
    );
  }

  render() {
    const styles = {
      articleText: {
        fontStyle: 'italic',
      },
    };
    return (
      <ListItem
        style={{ paddingLeft: 20 * this.props.depth }}
        secondaryText={this.props.newCommentVisible &&
          <CommentEditor
            onCommentPost={this.props.onCommentPost}
            onCommentCancel={() => this.props.onCommentToggle(this.props.id)}
            parent={this.props.id}
          />
        }
        nestedListStyle={{ marginLeft: 20, borderLeft: '1px dashed black' }}
        nestedItems={this.childAnnotations()}
      >
        <div>
          {this.props.depth === 0 && <div style={styles.articleText}>{this.props.articleText}</div>}
          <br />
          <Editor
            readOnly={true}
            editorState={this.state.commentEditorState}
          />
          {!this.props.newCommentVisible &&
            <RaisedButton onClick={() => this.props.onCommentToggle(this.props.id)} label="Reply" />
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
  id: PropTypes.string.isRequired,
};

Annotation.defaultProps = {
  articleText: '',
  text: '',
  depth: 0,
  childAnnotations: [],
  newCommentVisible: false,
};

export default Annotation;
