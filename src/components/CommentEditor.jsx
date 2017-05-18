import React from 'react';
import PropTypes from 'prop-types';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import marked from 'marked';
import Checkbox from 'material-ui/Checkbox';
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
  checkBox: {
    width: '40%',
    display: 'inline-block',
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
      isPublic: true,
    };
    this.onEditorChange = event => this.setState({ markdown: event.target.value });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  handleChecked(event, isInputChecked) {
    this.setState({ isPublic: isInputChecked });
  }

  handleSubmit() {
    const { articleText, ranges, groups } = this.props.newAnnotation;
    this.props.onCommentPost(this.props.parent,
      articleText,
      ranges,
      this.state.markdown,
      groups,
      this.state.isPublic,
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
          dangerouslySetInnerHTML={{
            __html: this.state.markdown.length > 0 ? marked(this.state.markdown) : marked('Nothing to preview'),
          }}
        />
        {!this.props.parent && <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div style={styles.checkBox} >
            <Checkbox
              label="Public:"
              style={{ width: '85%', paddingLeft: '10px' }}
              onCheck={this.handleChecked}
              checked={this.state.isPublic}
              checkedIcon={<Visibility />}
              uncheckedIcon={<VisibilityOff />}
              labelPosition="left"
            />
          </div>
          <GroupDropdownContainer />
        </div> }
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
