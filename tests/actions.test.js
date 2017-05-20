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
    const action = {
      type: types.CREATE_ANNOTATION,
    };
    expect(actions.createAnnotation()).toEqual(action);
  });

  it('should create action for updating user information', () => {
    const newUser = {
      username: 'billybobjones',
      groups: [],
      _id: '1243fds',
    };
    const action = {
      type: types.UPDATE_USER,
      newUser,
    };
    expect(actions.updateUser(newUser)).toEqual(action);
  });
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates RECEIVE_ANNOTATION after creating new annotation', () => {
    const articleText = 'Who let the dogs out?';
    const text = 'roof roof roof roof';
    const groups = [];
    fetchMock.post('*', { SUCCESS: {
      articleText,
      text,
    } });

    const expectedActions = [
      {
        type: types.REQUEST_ANNOTATIONS,
      },
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
        newAnnotation: {
          articleText,
          markdown: text,
        },
      },
    });
    store.dispatch(actions.createAnnotationAsync()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates UPDATE_AUTH_STATUS if not logged in and creating annotation', () => {
    fetchMock.post('*', 401);
    const store = mockStore({
      articles: {
        currentArticleUrl: 'www.tcpip.com',
        newAnnotation: {
          markdown: '',
        },
      },
    });
    store.dispatch(actions.createAnnotationAsync()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: types.REQUEST_ANNOTATIONS,
        },
        {
          type: types.UPDATE_AUTH_STATUS,
          isAuthenticated: false,
        },
        {
          type: types.FETCH_ANNOTATIONS_FAILURE,
        },
      ]);
    });
  });

  it('creates RECEIVE_REPLY after replying to an annotation', () => {
    const reply = {
      text: 'this is cool',
      parent: '123435235',
    };
    fetchMock.post('*', { SUCCESS: reply });

    const expectedActions = [
      {
        type: types.REQUEST_ANNOTATIONS,
      },
      {
        type: types.RECEIVE_REPLY,
        reply,
      },
    ];
    const store = mockStore({
      articles: {
        currentArticleUrl: 'www.gotgoats.com',
        newAnnotation: {
          text: reply.text,
          parent: reply.parent,
        },
      },
    });
    store.dispatch(actions.createAnnotationAsync()).then(() => {
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
      },
    ];
    fetchMock.get('*', annotations);

    const expectedActions = [
      {
        type: types.REQUEST_ANNOTATIONS,
      },
      {
        type: types.RECEIVE_ANNOTATIONS,
        annotations,
      },
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
        },
      ]);
    });
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
          newUser: {
            groups: [],
            username: 'Athelstan',
          },
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
