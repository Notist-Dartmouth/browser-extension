import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextToolBar from './TextToolBar';

class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit() {
    this.props.onCommentPost(this.props.parentId, this.props.articleText, this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <div>
        <TextToolBar onChange={this.handleChange} />
        <RaisedButton
          type="submit"
          onClick={this.handleSubmit}
          label="Post"
        />
      </div>
    );
  }
}

CommentBox.defaultProps = {
  parentId: null,
  articleText: null,
};

CommentBox.propTypes = {
  onCommentPost: PropTypes.func.isRequired,
  parentId: PropTypes.string,
  articleText: PropTypes.string,
};

export default CommentBox;
