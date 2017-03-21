import { connect } from 'react-redux';
import AnnotationForm from '../components/AnnotationForm';
import { toggleCreatingAnnotation, createAnnotation } from '../actions';

function mapStateToProps(state) {
  const { isCreatingAnnotation, currentSelection } = state.articleAnnotations;
  return {
    isCreatingAnnotation,
    articleSelection: currentSelection,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCommentPost: (parent, articleText, ranges, text) => dispatch(createAnnotation(parent, articleText, ranges, text)),
    onFormCancel: () => dispatch(toggleCreatingAnnotation()),
  };
}

const AnnotationFormContainer = connect(mapStateToProps, mapDispatchToProps)(AnnotationForm);

export default AnnotationFormContainer;
