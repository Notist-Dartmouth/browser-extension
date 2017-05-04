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
    border: '1px solid',
  },
  editorStyle: {
    border: '1px solid',
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
    this.togglePreview = this.togglePreview.bind(this);
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

  togglePreview() {
    this.setState({ isPreview: !this.state.isPreview });
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.controlBar}>
          <FlatButton
            onClick={() => this.togglePreview()}
          >
            <Icon icon={ICONS.MARKDOWN} viewBoxSize={1024} />
            {' Preview'}
          </FlatButton>
          <div
            style={{ paddingLeft: '10px' }}
            hidden={!this.state.isPreview}
            dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}
          />
        </div>
        <textarea
          style={styles.editorStyle}
          value={this.state.markdown}
          onChange={this.onEditorChange}
          placeholder="Enter Comment"
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
