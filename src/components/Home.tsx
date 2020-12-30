import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {logoutUser, Post} from "../actions";
import {fetchPosts} from "../actions";

type HomeProps = {
  isLoggingOut: boolean;
  logoutError: boolean;
  posts: Post[]
}

const Home = ({ posts }: HomeProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {
        posts && posts.map(post => <div>{post.title}</div>)
      }
    </div>
  );
}

function mapStateToProps(state: { auth: HomeProps, posts: { posts: Post[] } }) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    posts: state.posts.posts
  };
}

export default connect(mapStateToProps)(Home);
