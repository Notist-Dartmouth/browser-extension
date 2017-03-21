import configureMockStore from 'redux-mock-store';
import * as types from '../src/constants/ActionTypes';
import * as actions from '../src/actions';

describe('actions', () => {
  it('should create action for creating an annotation', () => {
    const articleText = 'valar morghulis';
    const text = 'valar dohaeris';
    const parent = 4;
    const action = {
      type: types.CREATE_ANNOTATION,
      articleText,
      text,
      parent,
    };
    expect(actions.createAnnotation(parent, articleText, text)).toEqual(action);
  });
});
