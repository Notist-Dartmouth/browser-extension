import React, { PropTypes } from 'react';
import marked from 'marked';
import FlatButton from 'material-ui/FlatButton';
import ICONS from '../constants/Icons';
import Icon from './Icon';
import GroupDropdownContainer from '../containers/GroupDropdownContainer';
import ButtonFooter from './ButtonFooter';

const styles = {
  container: {
    marginLeft: '20px',
    marginRight: '15px',
  },
  controlBar: {
    border: '1px solid gray',
  },
  editorStyle: {
    border: '1px solid gray',
    borderTop: 'none',
    minHeight: '100px',
    width: '97%',
    fontSize: '14px',
    cursor: 'text',
    padding: '5px',
    fontFamily: 'sans-serif',
  },
};

class CommentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPreview: false,
      markdown: '',
    };
    this.onEditorChange = event => this.setState({ markdown: event.target.value });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { articleText, ranges, groups } = this.props.newAnnotation;
    this.props.onCommentPost(this.props.parent,
      articleText,
      ranges,
      this.state.markdown,
      groups,
    );
    this.setState({
      markdown: '',
    });
    this.props.onCommentCancel();
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.controlBar}>
          <span style={{ paddingLeft: '10px' }}>
            <Icon icon={ICONS.MARKDOWN} viewBoxSize={1024} />
          </span>
          <FlatButton
            onClick={() => this.setState({ isPreview: true })}
            label="Preview"
            primary
            disabled={this.state.isPreview}
          />
          <FlatButton
            onClick={() => this.setState({ isPreview: false })}
            label="Write"
            primary
            disabled={!this.state.isPreview}
          />
        </div>
        <textarea
          style={styles.editorStyle}
          hidden={this.state.isPreview}
          value={this.state.markdown}
          onChange={this.onEditorChange}
          placeholder="Enter Comment"
        />
        <div
          style={styles.editorStyle}
          hidden={!this.state.isPreview}
          dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}
        />
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
