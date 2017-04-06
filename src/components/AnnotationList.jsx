import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Annotation from './Annotation';
import GroupDropdownContainer from '../containers/GroupDropdownContainer';

const AnnotationList = props => (
  <List>
    <Subheader>
      {props.annotations.length} annotations
    </Subheader>
    <GroupDropdownContainer label="Filter by group" />
    {props.annotations.length === 0 &&
      <Subheader
        style={{
          fontSize: '150%',
          lineHeight: '100%',
          display: 'inline-block',
        }}
      >
        Highlight text to create an annotation for this article
      </Subheader>}
    {props.annotations.map(a =>
      <Annotation
        {...a}
        key={a._id}
        onCommentPost={props.onCommentPost}
        onCommentToggle={props.onCommentToggle}
      />)}
  </List>
);

AnnotationList.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCommentPost: PropTypes.func.isRequired,
  onCommentToggle: PropTypes.func.isRequired,
};

export default AnnotationList;
