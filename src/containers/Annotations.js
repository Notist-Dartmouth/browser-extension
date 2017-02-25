import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';
import { createAnnotation } from '../actions';

function mapStateToProps(state) {
  const { annotations, isFetchingAnnotations, isCreatingAnnotation } = state.articleAnnotations;
  return {
    annotations,
    isFetchingAnnotations,
    isCreatingAnnotation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCommentPost: (parentId, text) => dispatch({
      type: 'CREATE_ANNOTATION',
      parentId,
      text,
    }),
  };
}

const Annotations = connect(mapStateToProps, mapDispatchToProps)(AnnotationList);
export default Annotations;
