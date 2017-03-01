import React, { PropTypes } from 'react';

const textBoxStyle = {
  border: '1px solid #ddd',
  minHeight: '100px',
  padding: '5px',
  fontFamily: 'sans-serif',
};

const TextToolBar = (props) => {

  const handleToolBarClick = (event) => {
    const cmd = event.target.getAttribute('data-cmd');
    document.execCommand(cmd, false, null);
  };

  return (
    <div>
      <button data-cmd="bold" href="#" onClick={handleToolBarClick}><strong>B</strong></button>
      <button data-cmd="italic" href="#" onClick={handleToolBarClick}><i>I</i></button>
      <button data-cmd="underline" href="#" onClick={handleToolBarClick}><u>U</u></button>
      <div>
        <input
          type="text"
          placeholder="Enter comment"
          onChange={props.onChange}
          style={textBoxStyle}
        />
      </div>
    </div>
  );
};

TextToolBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default TextToolBar;
