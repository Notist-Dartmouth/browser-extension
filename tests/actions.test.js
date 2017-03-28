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

  it('should create action for updating username and groupIds of user', () => {
    const username = 'billybobjones';
    const groupIds = [1, 33, 42, 5];
    const action = {
      type: types.UPDATE_USER,
      groupIds,
      username,
    }
    expect(actions.updateUser(groupIds, username)).toEqual(action);
  });
});

describe('async actions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates RECEIVE_ANNOTATION after creating new annotation', () => {
    const articleText = 'Who let the dogs out?';
    const text = 'roof roof roof roof';
    nock('http://localhost:3000/')
      .post('/api/annotation')
      .reply(200, { SUCCESS: {
        articleText,
        text,
      } } );

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
      articles: {
        currentArticleUrl: 'www.gotgoats.com',
      },
    });
    store.dispatch(actions.createAnnotationAsync(null, articleText, null, text)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_REPLY after replying to an annotation', () => {
    const reply = {
      text: 'this is cool',
      parent: '123435235',
    }
    nock('http://localhost:3000/')
      .post('/api/annotation')
      .reply(200, { SUCCESS: reply } );

    const expectedActions = [
      {
        type: types.RECEIVE_REPLY,
        reply,
      }
    ];
    const store = mockStore({
      articles: {
        currentArticleUrl: 'www.gotgoats.com',
      },
    });
    store.dispatch(actions.createAnnotationAsync(reply.parent, null, null, reply.text)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_ANNOTATIONS after fetching annotations', () => {
    const annotations = [
      {
        articleText: 'he was a sk8ter boy',
        text: 'she said see ya later boy',
      },
      {
        articleText: 'he wasnt good enough for her',
        text: 'now hes a super star',
      }
    ];
    nock('http://localhost:3000/')
      .get('/api/article/annotations')
      .reply(200, annotations);

    const expectedActions = [
      {
        type: types.RECEIVE_ANNOTATIONS,
        annotations,
      }
    ];
    const store = mockStore({
      articles: {
        isFetchingAnnotations: false,
        currentArticleUrl: 'www.athelstan.com',
      },
    });
    store.dispatch(actions.fetchAnnotationsAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('does not create RECEIVE_ANNOTATIONS if already fetching annotations', () => {
    const store = mockStore({
      articles: {
        isFetchingAnnotations: true,
      },
    });
    store.dispatch(actions.fetchAnnotationsAsync()).then(() => {
      expect(store.getActions()).toEqual([]);
    });
  });

  it('creates UPDATE_AUTH_STATUS if user is not logged in', () => {
    nock('http://localhost:3000/')
      .get('api/user')
      .reply(401, {});
    const store = mockStore({});
    store.dispatch(actions.fetchUserAsync()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: types.UPDATE_AUTH_STATUS,
          isAuthenticated: false,
        }
      ]);
    })
  });

  it('creates UPDATE_AUTH_STATUS and UPDATE_USER if logged in', () => {
    nock('http://localhost:3000/')
      .get('api/user')
      .reply(200, {
        groups: [1, 44, 23, 1],
        username: 'Athelstan',
      });
    const store = mockStore({});
    store.dispatch(actions.fetchUserAsync()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: types.UPDATE_AUTH_STATUS,
          isAuthenticated: true,
        },
        {
          type: types.UPDATE_USER,
          groupIds: [1, 44, 23, 1],
          username: 'Athelstan',
        },
      ]);
    });
  });
});
