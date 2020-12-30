import React from "react";
import {connect, useDispatch} from "react-redux";
import {logoutUser} from "../actions";

type HomeProps = {
  isLoggingOut: boolean;
  logoutError: boolean;
}

const Home = (props: HomeProps) => {
  const {isLoggingOut, logoutError} = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h1>This is your app's protected area.</h1>
      <p>Any routes here will also be protected</p>
      <button onClick={handleLogout}>Logout</button>
      {isLoggingOut && <p>Logging Out....</p>}
      {logoutError && <p>Error logging out</p>}
    </div>
  );
}

function mapStateToProps(state: { auth: HomeProps }) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(Home);
