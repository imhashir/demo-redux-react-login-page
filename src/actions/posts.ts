import {ThunkDispatch} from "redux-thunk";

export const POSTS_LOADING: string = "POSTS_LOADING";
export const POSTS_SUCCESS: string = "POSTS_SUCCESS";
export const POSTS_FAILURE: string = "POSTS_FAILURE";

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchingPosts = () => {
  return {
    type: POSTS_LOADING
  };
};

const fetchedPosts = (posts: Post[] | null) => {
  return {
    type: POSTS_SUCCESS,
    posts
  };
};

const fetchingPostsFailed = () => {
  return {
    type: POSTS_FAILURE
  };
};

export const fetchPosts = () => (dispatch: ThunkDispatch<Post, any, any>) => {
  dispatch(fetchingPosts());
  fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(async res => {
      dispatch(fetchedPosts(await res.json()))
    }).catch(error => {
      dispatch(fetchingPostsFailed())
    })
};
