import React from 'react';
import $ from 'jquery';

class TextToolBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false }
    this.onBoldClicked = this.handleClick.bind(this);
    this.onItalicClicked = this.handleClick.bind(this);
    this.onUnderlineClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    //  Get the text inside text area and surround it with <bold> </bold>
    const textarea = $('#comment-box');

    const text = textarea.val(); // If nothing selected

    const sel = textarea.getSelection;

    alert("All the text is: " + text + "\nand you selected: " + sel);
  }

  render() {
    return (
      <div>
        <button onClick={this.onBoldClicked}>B</button>
        <button onClick={this.onItalicClicked}>I</button>
        <button onClick={this.onUnderlineClick}>U</button>
      </div>
    );
  }
}

export default TextToolBar;
