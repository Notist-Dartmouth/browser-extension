import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import marked from 'marked';
import moment from 'moment';
import CommentEditor from './CommentEditor';
import ReplyBar from './ReplyBar';

class Annotation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      hovering: false,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.childAnnotations = this.childAnnotations.bind(this);
    this.getAuthorDisplayName = this.getAuthorDisplayName.bind(this);
    this.focusHighlight = this.focusHighlight.bind(this);
    this.toggleExpanded = () => this.setState({ isExpanded: !this.state.isExpanded });
  }

  getAuthorDisplayName() {
    if (this.props.author && this.props.author.name) {
      const filteredName = this.props.author.name.split(' ');
      if (filteredName.length >= 2 && filteredName[1].charAt(0)) {
        return `${filteredName[0]} ${filteredName[1].charAt(0)}.`;
      } else {
        return this.props.author.name;
      }
    } else {
      return 'Anonymous';
    }
  }

  handleMouseOver() {
    this.setState({
      hovering: true,
    });
  }

  handleMouseOut() {
    this.setState({
      hovering: false,
    });
  }

  childAnnotations() {
    return this.props.childAnnotations.map(a =>
      <Annotation
        {...a}
        key={a._id}
        author={a.author}
        dateCreated={a.createDate}
        depth={this.props.depth + 1}
        onCommentPost={this.props.onCommentPost}
        onCommentToggle={this.props.onCommentToggle}
      />);
  }

  focusHighlight() {
    parent.focusHighlight(this.props._id);
  }

  render() {
    const styles = {
      articleText: {
        fontStyle: 'italic',
        borderLeft: this.state.hovering ? 'thick solid #44808C' : 'thick solid #F98C25',
        paddingLeft: 10,
        paddingBottom: 10,
        color: this.state.hovering ? '#F98C25' : 'black',
        cursor: this.state.hovering ? 'pointer' : 'auto',
      },
      expandButton: {
        position: 'absolute',
        bottom: 0,
      },
      commentText: {
        paddingBottom: 20,
      },
      listItem: {
        cursor: 'auto',
        backgroundColor: 'none',
        paddingLeft: 20 * this.props.depth,
      },
    };

    return (
      <ListItem
        style={styles.listItemStyle}
        nestedListStyle={{ marginLeft: 20, borderLeft: '1px dashed black' }}
        nestedItems={this.childAnnotations()}
        open={this.state.isExpanded}
        onNestedListToggle={this.toggleExpanded}
      >
        <div>
          <div>
            <span style={{ fontWeight: 900 }} >{this.getAuthorDisplayName()}</span>
            <span style={{ paddingLeft: 12 }} >{moment(this.props.dateCreated).fromNow()}</span>
          </div>
          <br />
          {this.props.depth === 0 &&
            <div
              style={styles.articleText}
              role="button"
              onClick={this.focusHighlight}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
            >
              {this.props.articleText}
            </div>}
          <br />
          <div
            style={styles.commentText}
            dangerouslySetInnerHTML={{ __html: marked(this.props.text) }}
          />
          <ReplyBar
            onReplyClicked={() => this.props.onCommentToggle(this.props._id)}
            authorId={this.props.author ? this.props.author._id : ''}
            annotationId={this.props._id}
          />
          {
            this.props.childAnnotations.length > 0 && !this.state.isExpanded &&
            <FlatButton
              style={styles.expandButton}
              primary
              onClick={this.toggleExpanded}
              label={`Show Replies (${this.props.childAnnotations.length})`}
            />
          }
          {this.props.newCommentVisible &&
          <div>
            <CommentEditor
              onCommentPost={this.props.onCommentPost}
              onCommentCancel={() => this.props.onCommentToggle(this.props._id)}
              parent={this.props._id}
            />
          </div>}
        </div>
      </ListItem>
    );
  }
}

Annotation.propTypes = {
  articleText: PropTypes.string,
  text: PropTypes.string,
  depth: PropTypes.number,
  dateCreated: PropTypes.string.isRequired,
  newCommentVisible: PropTypes.bool,
  childAnnotations: PropTypes.arrayOf(PropTypes.object),
  onCommentPost: PropTypes.func.isRequired,
  onCommentToggle: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
  }),
};

Annotation.defaultProps = {
  articleText: '',
  text: '',
  depth: 0,
  childAnnotations: [],
  newCommentVisible: false,
  author: {
    _id: '',
    name: '',
  },
};

export default Annotation;
