import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';
import marked from 'marked';
import CommentBox from './CommentBox';

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
      />
    );
  }

  render() {
    return (
      <ListItem
        style={{ paddingLeft: 20 * this.props.depth }}
        secondaryText={<CommentBox onCommentPost={this.props.onCommentPost} parentId={this.props.id} />}
        nestedListStyle={{ marginLeft: 20, borderLeft: '1px dashed black' }}
        nestedItems={this.childAnnotations()}
      >
        <div>
          {this.props.depth === 0 && <div className="article-text">{this.props.articleText}</div>}
          <br />
          <Editor
            readOnly
            editorState={this.state.commentEditorState}
          />
        </div>
      </ListItem>
    );
  }
}

Annotation.propTypes = {
  articleText: PropTypes.string,
  text: PropTypes.string,
  depth: PropTypes.number,
  childAnnotations: PropTypes.arrayOf(PropTypes.object),
  onCommentPost: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

Annotation.defaultProps = {
  articleText: '',
  text: '',
  depth: 0,
  childAnnotations: [],
};

export default Annotation;
