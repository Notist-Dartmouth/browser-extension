import React, { PropTypes } from 'react';

// based on this article: https://medium.com/@david.gilbertson/icons-as-react-components-de3e33cb8792#.z11dp5ddx

const Icon = (props) => {
  return (
    <svg
      width={`${props.size}`}
      height={`${props.size}`}
      viewBox={`0 0 ${props.viewBoxSize} ${props.viewBoxSize}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={props.icon} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  viewBoxSize: PropTypes.number,
};

Icon.defaultProps = {
  size: 18,
  viewBoxSize: 24,
};

export default Icon;
