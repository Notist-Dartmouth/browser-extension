import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { connect } from 'react-redux';
import { deleteAnnotation } from '../actions';

const styles = {
  replyBar: {
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  icon: {
    color: '#585858',
  },
};

const ReplyBar = props => (
  <div style={styles.replyBar}>
    <IconButton
      onClick={props.onReplyClicked}
      tooltip="Reply"
      tooltipPosition="top-center"
      iconStyle={styles.icon}
    >
      <ContentReply />
    </IconButton>
    {props.authorId === props.userId && <IconButton
      tooltip="Delete"
      tooltipPosition="top-center"
      iconStyle={styles.icon}
      onClick={() => props.onDeleteClicked(props.annotationId)}
    >
      <ActionDelete />
    </IconButton>}
  </div>
);

ReplyBar.propTypes = {
  onReplyClicked: PropTypes.func.isRequired,
  authorId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  annotationId: PropTypes.string.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
};

ReplyBar.defaultProps = {
  userId: '',
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
