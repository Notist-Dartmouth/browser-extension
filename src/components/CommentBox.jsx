import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class CommentBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ commentText: e.target.value });
  }

  handleSubmit() {
    this.props.onCommentPost(this.props.annotationId, this.state.commentText);
    this.setState({ commentText: '' });
  }

  render() {
    return (
      <Paper>
        <TextField
          hintText="Enter comment"
          multiLine={true}
          rowsMax={4}
          value={this.state.commentText}
          onChange={this.handleChange}
        />
        <RaisedButton
          type="submit"
          onClick={this.handleSubmit}
          label="Post"
        />
      </Paper>
    );
  }
}

CommentBox.propTypes = {
  onCommentPost: PropTypes.func.isRequired,
  annotationId: PropTypes.number.isRequired,
};

export default CommentBox;
