export default function currentArticleUrl(state = '', action) {
  switch (action.type) {
    case 'UPDATE_ARTICLE_URL':
      return action.url;
    default:
      return state;
  }
}
