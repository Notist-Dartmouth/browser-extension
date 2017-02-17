import { connect } from 'react-redux';
import AnnotationList from '../components/AnnotationList';

const mapStateToProps = (state) => {
  return {
    annotations: state.annotations
  }
}

const Annotations = connect(mapStateToProps)(AnnotationList);
export default Annotations;
