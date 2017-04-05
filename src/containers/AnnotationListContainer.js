import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';
import { toggleNewComment, createAnnotation } from '../actions';

function mapStateToProps(state) {
  const { annotations } = state.articles;
  return { annotations };
}

function mapDispatchToProps(dispatch) {
  return {
    onCommentPost: (parent, articleText, ranges, text, groups) =>
      dispatch(createAnnotation(parent, articleText, ranges, text, groups)),
    onCommentToggle: annotationId => dispatch(toggleNewComment(annotationId)),
  };
}

const AnnotationListContainer = connect(mapStateToProps, mapDispatchToProps)(AnnotationList);

export default AnnotationListContainer;
