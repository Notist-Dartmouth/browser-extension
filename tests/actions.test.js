import * as types from '../src/constants/actionTypes';
import * as actions from '../src/actions';

describe('actions', () => {
  it('should create action for creating an annotation', () => {
    const articleText = 'valar morghulis';
    const text = 'valar dohaeris';
    const parentId = 4;
    const action = {
      type: types.CREATE_ANNOTATION,
      articleText,
      text,
      parentId,
    };
    expect(actions.createAnnotation(parentId, articleText, text)).toEqual(action);
  });
});
