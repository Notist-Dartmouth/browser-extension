import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';
import { addChildAnnotation } from '../actions';

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
    onCommentPost: (id, text) => dispatch(addChildAnnotation(id, text)),
  };
}

const Annotations = connect(mapStateToProps, mapDispatchToProps)(AnnotationList);
export default Annotations;
