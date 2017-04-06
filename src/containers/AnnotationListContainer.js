import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';
import { toggleNewComment, createAnnotation } from '../actions';

function inFilter(annotationGroups, groupsFilter) {
  for (let i = 0; i < annotationGroups.length; i += 1) {
    if (groupsFilter.includes(annotationGroups[i])) {
      return true;
    }
  }
  return false;
}

function mapStateToProps(state) {
  const { annotations, groupsFilter } = state.articles;
  return {
    annotations: groupsFilter.length === 0 ? annotations
      : annotations.filter(a => inFilter(a.groups, groupsFilter)),
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
