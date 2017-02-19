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
        />
      )}
    </List>
  );
};

AnnotationList.propTypes = {
  annotations: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCommentPost: PropTypes.func.isRequired,
};

export default AnnotationList;
