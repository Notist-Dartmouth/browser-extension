import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';
import AnnotationForm from '../components/AnnotationForm';

function mapStateToProps(state) {
  const { annotations, isFetchingAnnotations, isCreatingAnnotation, selectedArticleText } = state.articleAnnotations;
  return {
    annotations,
    isFetchingAnnotations,
    isCreatingAnnotation,
    articleText: selectedArticleText,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCommentPost: (parentId, articleText, text) => dispatch({
      type: 'CREATE_ANNOTATION',
      articleText,
      parentId,
      text,
    }),
  };
}

export const AnnotationListContainer = connect(mapStateToProps, mapDispatchToProps)(AnnotationList);

export const AnnotationFormContainer = connect(mapStateToProps, mapDispatchToProps)(AnnotationForm);
