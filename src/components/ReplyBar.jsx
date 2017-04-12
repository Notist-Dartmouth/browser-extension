import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { StyleSheet, css } from 'aphrodite';

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
});

const ReplyBar = props => (
  <div className={css(styles.replyBar)}>
    <IconButton
      iconStyle={styles.icon}
      onClick={props.onReplyClicked}
      tooltip="Reply"
    >
      <ContentReply />
    </IconButton>
    <IconButton
      iconStyle={styles.icon}
      tooltip="Delete"
    >
      <ActionDelete />
    </IconButton>
  </div>
);

ReplyBar.propTypes = {
  onReplyClicked: PropTypes.func.isRequired,
};

export default ReplyBar;
