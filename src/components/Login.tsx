import React, {ChangeEvent, useState} from "react";
import {connect, useDispatch} from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { withStyles } from "@material-ui/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { WithStyles } from "@material-ui/core";

interface LoginProps extends WithStyles {
  isLoggingIn: boolean;
  loginError: any;
  isAuthenticated: boolean;
  classes: any;
}

const Login = (props: LoginProps) => {
  const [state, setState] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleEmailChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    setState({ ...state, email: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    setState({ ...state, password: e.target.value });
  };

  const handleSubmit = () => {
    const { email, password } = state;

    dispatch(loginUser(email, password));
  };

  const { classes, loginError, isAuthenticated } = props;
  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleEmailChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
          {loginError && (
            <Typography component="p" className={classes.errorText}>
              Incorrect email or password.
            </Typography>
          )}
          <Button
            type="button"
            variant="outlined"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </Paper>
      </Container>
    );
  }
}

function mapStateToProps(state: { auth: LoginProps }) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default withStyles({
  "@global": {
    body: {
      backgroundColor: "#fff8e4"
    }
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057"
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  }
})(connect(mapStateToProps)(Login));
