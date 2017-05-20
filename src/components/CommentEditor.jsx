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
import {
  updateAnnotationPublic,
  updateAnnotationMarkdown,
  updateAnnotationParent,
} from '../actions';

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
    };
    this.onEditorBlur = event => this.props.dispatch(updateAnnotationMarkdown(event.target.value));
    this.onEditorChange = event => this.setState({ markdown: event.target.value });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
  }

  componentWillMount() {
    this.setState({ markdown: this.props.newAnnotation.markdown });
  }

  componentDidMount() {
    this.props.dispatch(updateAnnotationParent(this.props.parent));
  }

  handleChecked(event, isInputChecked) {
    this.props.dispatch(updateAnnotationPublic(isInputChecked));
  }

  handleCancel() {
    this.setState({ markdown: '' });
    this.props.onCommentCancel();
  }

  handleSubmit() {
    this.props.onCommentPost();
    this.props.dispatch(updateAnnotationMarkdown(''));
    this.setState({ markdown: '' });
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
          onBlur={this.onEditorBlur}
          placeholder="Enter Comment"
        />
        <div
          style={styles.editorStyle}
          hidden={!this.state.isPreview}
          dangerouslySetInnerHTML={{
            __html: this.props.newAnnotation.markdown.length > 0 ? marked(this.props.newAnnotation.markdown) : marked('Nothing to preview'),
          }}
        />
        {!this.props.parent && <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div style={styles.checkBox} >
            <Checkbox
              label="Public:"
              style={{ width: '85%', paddingLeft: '10px' }}
              onCheck={this.handleChecked}
              checked={this.props.newAnnotation.isPublic}
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
          onSecondaryClicked={this.handleCancel}
        />
      </div>
    );
  }
}

CommentEditor.propTypes = {
  onCommentCancel: PropTypes.func.isRequired,
  onCommentPost: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  parent: PropTypes.string,
  newAnnotation: PropTypes.shape({
    markdown: PropTypes.string,
    isPublic: PropTypes.bool,
  }),
};

CommentEditor.defaultProps = {
  parent: null,
  newAnnotation: {
    markdown: '',
    isPublic: true,
  },
};

export default CommentEditor;
