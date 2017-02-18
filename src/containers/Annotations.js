import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';
import { addChildAnnotation } from '../actions';

const mapStateToProps = (state) => {
  return {
    annotations: state.annotations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCommentPost: (id, text) => dispatch(addChildAnnotation(id, text))
  };
};

const Annotations = connect(mapStateToProps, mapDispatchToProps)(AnnotationList);
export default Annotations;
