import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
import * as types from '../src/constants/ActionTypes';
import * as actions from '../src/actions';

// These tests are based on redux documentation for testing action creators and async action creators - http://redux.js.org/docs/recipes/WritingTests.html

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

describe('async actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVE_ANNOTATION after creating new annotation', () => {
    const articleText = 'Who let the dogs out?';
    const text = 'roof roof roof roof';
    nock('http:///* @echo API_HOST *//')
      .get('/api/annotation')
      .reply(200, { SUCCESS: {
        articleText,
        text,
      } });

    const expectedActions = [
      {
        type: types.RECEIVE_ANNOTATION,
        annotation: {
          articleText,
          text,
        },
      },
    ];
    const store = mockStore({
      articleAnnotations: {
        currentArticleUrl: 'www.gotgoats.com',
      },
    });
    return store.dispatch(actions.createAnnotationAsync(null, articleText, null, text)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
