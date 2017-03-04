import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import Annotation from './Annotation';

const AnnotationList = (props) => {
  return (
    <List>
      {props.annotations.map(a =>
        <Annotation
          {...a}
          key={a.id}
          onCommentPost={props.onCommentPost}
          onCommentToggle={props.onCommentToggle}
        />
      )}
    </List>
  );
};

AnnotationList.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCommentPost: PropTypes.func.isRequired,
  onCommentToggle: PropTypes.func.isRequired,
};

export default AnnotationList;
