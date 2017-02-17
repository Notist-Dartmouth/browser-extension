import React, { PropTypes } from 'react';
import { ListItem } from 'material-ui/List';

const Annotation = (props) => {
  return (
    <div>
      <ListItem primaryText={props.articleText} />
    </div>
  );
}

Annotation.propTypes = {
  articleText: PropTypes.string.isRequired,
}

export default Annotation;
