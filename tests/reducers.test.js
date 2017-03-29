import articlesReducer from '../src/reducers/articles';
import userReducer from '../src/reducers/user';
import * as types from '../src/constants/ActionTypes';

// These tests are based on redux documentation for testing reducers - http://redux.js.org/docs/recipes/WritingTests.html

describe('articles reducer', () => {

  it('should return initial state', () => {
    const initialState = {
      isFetchingAnnotations: false,
      isCreatingAnnotation: false,
      annotations: [],
      currentArticleUrl: '',
      currentSelection: {
        articleText: '',
        ranges: [],
      },
    };
    expect(articlesReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle RECEIVE_ANNOTATION', () => {
    const expectedNewState = {
      isFetchingAnnotations: false,
      isCreatingAnnotation: false,
      annotations: [
        {
          _id: '12343532',
          articleText: 'the ring of fire',
          text: 'blue moon',
          ranges: [],
          childAnnotations: [],
          newCommentVisible: false,
        },
      ],
      currentArticleUrl: '',
      currentSelection: {
        articleText: '',
        ranges: [],
      },
    };
    const action = {
      type: types.RECEIVE_ANNOTATION,
      annotation: {
        _id: '12343532',
        articleText: 'the ring of fire',
        text: 'blue moon',
      },
    };
    expect(articlesReducer(undefined, action)).toEqual(expectedNewState);
  });

  it('should handle RECEIVE_REPLY for a reply to an annotation', () => {
    expect(articlesReducer({
      isFetchingAnnotations: false,
      isCreatingAnnotation: false,
      annotations: [
        {
          _id: '1',
          articleText: 'when the man comes around',
          text: 'folsom prison',
          ranges: [],
          childAnnotations: [],
          newCommentVisible: false,
        },
      ],
      currentArticleUrl: '',
      currentSelection: {
        articleText: '',
        ranges: [],
      },
    }, {
      type: types.RECEIVE_REPLY,
      reply: {
        parent: '1',
        _id: '2',
        text: 'great job!',
      },
    })).toEqual({
      isFetchingAnnotations: false,
      isCreatingAnnotation: false,
      annotations: [
        {
          _id: '1',
          articleText: 'when the man comes around',
          text: 'folsom prison',
          ranges: [],
          childAnnotations: [
            {
              _id: '2',
              parent: '1',
              text: 'great job!',
              ranges: [],
              childAnnotations: [],
              newCommentVisible: false,
            },
          ],
          newCommentVisible: false,
        },
      ],
      currentArticleUrl: '',
      currentSelection: {
        articleText: '',
        ranges: [],
      },
    });
  });

  it('should handle RECEIVE_REPLY for a reply to a reply', () => {
    expect(articlesReducer({
      isFetchingAnnotations: false,
      isCreatingAnnotation: false,
      annotations: [
        {
          _id: '1',
          articleText: 'i hear the train coming',
          text: 'its coming around the bend',
          childAnnotations: [],
          ranges: [],
          newCommentVisible: false,
        },
        {
          _id: '2',
          articleText: 'and i aint seen the sunshine',
          text: 'since i dont know when',
          childAnnotations: [
            {
              _id: '3',
              parent: '2',
              articleText: 'stuck in folsom prison',
              text: 'cant be free',
              childAnnotations: [],
              ranges: [],
              newCommentVisible: false,
            },
          ],
          ranges: [],
          newCommentVisible: false,
        },
      ],
      currentArticleUrl: '',
      currentSelection: {
        articleText: '',
        ranges: [],
      },
    }, {
      type: types.RECEIVE_REPLY,
      reply: {
        _id: '4',
        parent: '3',
        articleText: 'when I hear that whistle blowing',
        text: 'i hang my head and cry',
        childAnnotations: [],
        ranges: [],
        newCommentVisible: false,
      },
    })).toEqual({
      isFetchingAnnotations: false,
      isCreatingAnnotation: false,
      annotations: [
        {
          _id: '1',
          articleText: 'i hear the train coming',
          text: 'its coming around the bend',
          childAnnotations: [],
          ranges: [],
          newCommentVisible: false,
        },
        {
          _id: '2',
          articleText: 'and i aint seen the sunshine',
          text: 'since i dont know when',
          childAnnotations: [
            {
              _id: '3',
              parent: '2',
              articleText: 'stuck in folsom prison',
              text: 'cant be free',
              childAnnotations: [
                {
                  _id: '4',
                  parent: '3',
                  articleText: 'when I hear that whistle blowing',
                  text: 'i hang my head and cry',
                  childAnnotations: [],
                  ranges: [],
                  newCommentVisible: false,
                },
              ],
              ranges: [],
              newCommentVisible: false,
            },
          ],
          ranges: [],
          newCommentVisible: false,
        },
      ],
      currentArticleUrl: '',
      currentSelection: {
        articleText: '',
        ranges: [],
      },
    });
  });
});

describe('user reducer', () => {
  it('should return initial state by default', () => {
    expect(userReducer(undefined, {})).toEqual({
      isFetchingUser: false,
      isAuthenticated: false,
      groupIds: [],
      username: '',
    });
  });

  it('should handle UPDATE_AUTH_STATUS', () => {
    const loginAction = {
      type: types.UPDATE_AUTH_STATUS,
      isAuthenticated: true,
    };
    expect(userReducer(undefined, loginAction)).toEqual({
      isFetchingUser: false,
      isAuthenticated: true,
      groupIds: [],
      username: '',
    });
    const logoutAction = {
      type: types.UPDATE_AUTH_STATUS,
      isAuthenticated: false,
    };
    expect(userReducer({
      isFetchingUser: true,
      isAuthenticated: true,
      groupIds: [1, 23, 4],
      username: 'peter',
    }, logoutAction)).toEqual({
      isFetchingUser: false,
      isAuthenticated: false,
      groupIds: [1, 23, 4],
      username: 'peter',
    });
  });
});
