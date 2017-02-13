import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';

const mapStateToProps = (state) => {
  console.log(state.annotations);
  return {
    annotations: state.annotations
  }
}

const Annotations = connect(mapStateToProps)(AnnotationList);
export default Annotations;
