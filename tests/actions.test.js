import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
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

  it('should create action for updating username and groups of user', () => {
    const username = 'billybobjones';
    const groups = [];
    const action = {
      type: types.UPDATE_USER,
      groups,
      username,
    }
    expect(actions.updateUser(groups, username)).toEqual(action);
  });
});

describe('async actions', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('creates RECEIVE_ANNOTATION after creating new annotation', () => {
    const articleText = 'Who let the dogs out?';
    const text = 'roof roof roof roof';
    fetchMock.post('*', { SUCCESS: {
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

  it('creates UPDATE_AUTH_STATUS if not logged in and creating annotation', () => {
    fetchMock.post('*', 401);
    const store = mockStore({
      articles: {
        currentArticleUrl: 'www.tcpip.com',
      },
    });
    store.dispatch(actions.createAnnotationAsync(null, 'the', null, 'walk')).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: types.UPDATE_AUTH_STATUS,
          isAuthenticated: false,
        }
      ]);
    });
  });

  it('creates RECEIVE_REPLY after replying to an annotation', () => {
    const reply = {
      text: 'this is cool',
      parent: '123435235',
    }
    fetchMock.post('*', { SUCCESS: reply } );

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
    fetchMock.get('*', annotations);

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

  it('creates UPDATE_AUTH_STATUS if not logged in and fetching user info', () => {
    fetchMock.get('*', 401);
    const store = mockStore({
      user: { isFetchingUser: false },
    });
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
    fetchMock.get('*', {
      groups: [],
      username: 'Athelstan',
    });
    const store = mockStore({
      user: { isFetchingUser: false },
    });
    store.dispatch(actions.fetchUserAsync()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: types.UPDATE_USER,
          groups: [],
          username: 'Athelstan',
        },
        {
          type: types.UPDATE_AUTH_STATUS,
          isAuthenticated: true,
        },
      ]);
    });
  });

  it('does not create UPDATE_USER if already fetching user', () => {
    const store = mockStore({
      user: { isFetchingUser: true },
    });
    store.dispatch(actions.fetchUserAsync()).then(() => {
      expect(store.getActions()).toEqual([]);
    });
  });
});
