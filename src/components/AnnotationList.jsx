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
    { props.isFetchingAnnotations && props.isAuthenticated &&
      <h3 style={{ textAlign: 'center' }}>
        Loading...
      </h3>
    }
    <GroupDropdownContainer label="Filter by group" />
    <br />
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
        author={a.author}
        onCommentPost={props.onCommentPost}
        onCommentToggle={props.onCommentToggle}
      />)}
  </List>
);

AnnotationList.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCommentPost: PropTypes.func.isRequired,
  onCommentToggle: PropTypes.func.isRequired,
  isFetchingAnnotations: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default AnnotationList;
