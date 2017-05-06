import { connect } from 'react-redux';
import _ from 'underscore';
import AnnotationList from '../components/AnnotationList';
import { toggleNewComment, createAnnotation } from '../actions';

function mapStateToProps(state) {
  const { annotations, groupsFilter, isFetchingAnnotations } = state.articles;
  const { isAuthenticated } = state.user;
  return {
    annotations: groupsFilter.length === 0 ? annotations
      : annotations.filter(a => _.intersection(groupsFilter, a.groups).length > 0),
    isFetchingAnnotations,
    isAuthenticated,
  };
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
