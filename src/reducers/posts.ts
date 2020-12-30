import {
  POSTS_FAILURE,
  POSTS_SUCCESS,
  POSTS_LOADING
} from "../actions/";
import {Post} from "../actions";

export default (
  state = {
    isLoading: false,
    isFailed: false,
    isSuccessful: false,
  },
  { posts, type }: { posts: Post[], type: string }
) => {
  switch (type) {
    case POSTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccessful: true,
        posts: posts
      };
    case POSTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        isSuccessful: false
      };
    default:
      return state;
  }
};
