import React from 'react';

const styles = {
  editableDiv: {
    border: '1px solid #ddd',
    minHeight: '100px',
    padding: '5px',
    fontFamily: 'sans-serif',
  },
};

class TextToolBar extends React.Component {

  //  Ideally there should be one function that will look at the data-cmd field and use that in execCommand
  //  Like this: var cmd = $(this).data.cmd;
  //  document.execCommand(cmd, false, null);

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onBoldClicked = this.handleClickB.bind(this);
    this.onItalicClicked = this.handleClickI.bind(this);
    this.onUnderlineClicked = this.handleClickU.bind(this);
  }

  handleClickB(event) {
    document.execCommand('bold', false, null);
  }

  handleClickI(event) {
    document.execCommand('italic', false, null);
  }

  handleClickU(event) {
    document.execCommand('underline', false, null)
  }

  render() {
    return (
        <div>
          <a id="datacmd" data-cmd="bold" href="#" onClick={this.onBoldClicked}><strong>B</strong></a>
          <a id="datacmd" data-cmd="italic" href="#" onClick={this.onItalicClicked}><i>I</i></a>
          <a id="datacmd" data-cmd="underline" href="#" onClick={this.onUnderlineClicked}><u>U</u></a>
          <div id="editable" contentEditable="true" style={styles.editableDiv}>
            Write here!
          </div>
        </div>
    );
  }
}

export default TextToolBar;
