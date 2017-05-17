import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Annotation from './Annotation';
import GroupDropdownContainer from '../containers/GroupDropdownContainer';

const AnnotationList = props => (
  <List>
    <div>
      <Subheader style={{ width: '40%' }}>
        {props.annotations.length} annotations
      </Subheader>
      <div style={{ paddingLeft: '15px' }}>
        <GroupDropdownContainer label="Filter by group" />
      </div>
    </div>
    { props.isFetchingAnnotations && props.isAuthenticated &&
      <h3 style={{ textAlign: 'center' }}>
        Loading...
      </h3>
    }
    <br />
    {props.annotations.length === 0 &&
      <Subheader
        style={{
          fontSize: '150%',
          lineHeight: '100%',
          display: 'inline-block',
        }}
      >
        Select text to annotate an article
      </Subheader>}
    {props.annotations.map(a =>
      <Annotation
        {...a}
        key={a._id}
        author={a.author}
        dateCreated={a.createDate}
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
