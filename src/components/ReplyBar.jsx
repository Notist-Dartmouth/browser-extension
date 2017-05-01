import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { deleteAnnotation } from '../actions';

const styles = StyleSheet.create({
  replyBar: {
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  icon: {
    width: 48,
    height: 48,
  },
  button: {
    boxShadow: 'initial',
  },
});

const ReplyBar = props => (
  <div className={css(styles.replyBar)}>
    <IconButton
      className={css(styles.button)}
      iconStyle={styles.icon}
      onClick={props.onReplyClicked}
      tooltip="Reply"
    >
      <ContentReply />
    </IconButton>
    <IconButton
      className={css(styles.button)}
      iconStyle={styles.icon}
      tooltip="Delete"
      disabled={props.authorId !== props.userId}
      onClick={() => props.onDeleteClicked(props.annotationId)}
    >
      <ActionDelete />
    </IconButton>
  </div>
);

ReplyBar.propTypes = {
  onReplyClicked: PropTypes.func.isRequired,
  authorId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  annotationId: PropTypes.string.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    userId: state.user._id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDeleteClicked: annotationId => dispatch(deleteAnnotation(annotationId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyBar);
