import React, { PropTypes } from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Annotation from './Annotation';
import GroupDropdown from './GroupDropdown/GroupDropdown';

const mockGroups = [
  {
    _id: '1',
    name: 'notist',
    description: 'cool man i like this',
  },
  {
    _id: '2',
    name: 'peter group',
    description: 'just for me',
  },
];

const AnnotationList = props => (
  <List>
    <Subheader>
      {props.annotations.length} annotations
      {props.annotations.length > 0 && <GroupDropdown
        label="Filter by group"
        groups={mockGroups}
      />}
    </Subheader>
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
