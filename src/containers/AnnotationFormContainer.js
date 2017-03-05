import { connect } from 'react-redux';
import AnnotationForm from '../components/AnnotationForm';
import { toggleCreatingAnnotation, createAnnotation } from '../actions';

function mapStateToProps(state) {
  const { isCreatingAnnotation, selectedArticleText } = state.articleAnnotations;
  return {
    isCreatingAnnotation,
    articleText: selectedArticleText,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCommentPost: (parentId, articleText, text) => dispatch(createAnnotation(parentId, articleText, text)),
    onFormCancel: () => dispatch(toggleCreatingAnnotation()),
  };
}

const AnnotationFormContainer = connect(mapStateToProps, mapDispatchToProps)(AnnotationForm);

export default AnnotationFormContainer;
