import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';
import { toggleNewComment, createAnnotation } from '../actions';

function mapStateToProps(state) {
  const { annotations } = state.articleAnnotations;
  return { annotations };
}

function mapDispatchToProps(dispatch) {
  return {
    onCommentPost: (parent, articleText, ranges, text) => dispatch(createAnnotation(parent, articleText, ranges, text)),
    onCommentToggle: annotationId => dispatch(toggleNewComment(annotationId)),
  };
}

const AnnotationListContainer = connect(mapStateToProps, mapDispatchToProps)(AnnotationList);

export default AnnotationListContainer;
