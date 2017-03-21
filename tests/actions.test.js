import configureMockStore from 'redux-mock-store';
import * as types from '../src/constants/ActionTypes';
import * as actions from '../src/actions';

describe('actions', () => {
  it('should create action for creating an annotation', () => {
    const articleText = 'valar morghulis';
    const ranges = [{
      end: '/p[69]/span/span',
      endOffset: 12,
      start: '/p[70]/span/span',
      startOffset: 1,
    }];
    const text = 'valar dohaeris';
    const parent = 4;
    const action = {
      type: types.CREATE_ANNOTATION,
      articleText,
      ranges,
      text,
      parent,
    };
    expect(actions.createAnnotation(parent, articleText, ranges, text)).toEqual(action);
  });
});
