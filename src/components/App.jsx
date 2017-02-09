import React from 'react';
import AnnotationList from './AnnotationList';

export default class App extends React.Component {
  render() {
    return (<AnnotationList annotations={[{id: 1, articleText: "peter"},{id: 2, articleText: "merwin"}]}/>);
  }
}
