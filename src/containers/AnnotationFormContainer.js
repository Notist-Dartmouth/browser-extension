import { connect } from 'react-redux';
import AnnotationForm from '../components/AnnotationForm';
import { toggleCreatingAnnotation, createAnnotation } from '../actions';

function mapStateToProps(state) {
  const { isCreatingAnnotation, newAnnotation } = state.articles;
  return {
    isCreatingAnnotation,
    newAnnotation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCommentPost: () => dispatch(createAnnotation()),
    onFormCancel: () => dispatch(toggleCreatingAnnotation()),
  };
}

const AnnotationFormContainer = connect(mapStateToProps, mapDispatchToProps)(AnnotationForm);

export default AnnotationFormContainer;
