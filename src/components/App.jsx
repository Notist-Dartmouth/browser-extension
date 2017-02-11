import React from 'react';
import AnnotationList from './AnnotationList';

var testdata = [{id: 1, articleText: "peter"},{id: 2, articleText: "merwin"}]

export default class App extends React.Component {
  render() {
    return (<AnnotationList annotations={testdata}/>);
  }
}
