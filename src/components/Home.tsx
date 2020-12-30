import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import {logoutUser, Post} from "../actions";
import {fetchPosts} from "../actions";
import {Button, Grid, TableRow, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {User} from "firebase";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { Table } from "@material-ui/core";

type HomeProps = {
  user: User
  posts: Post[];
  classes: any;
}

const Home = ({ posts, classes, user }: HomeProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  return <div className={classes.container}>
    <Grid className={classes.header} justify='space-between' direction="row" container>
      <Typography variant="h4" className={classes.email}>{user.email}</Typography>
      <Button variant="outlined" onClick={handleLogout}>Logout</Button>
    </Grid>
    <Grid className={classes.list} direction="column" container>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {
            posts && posts.map(({ title, id }) => <TableRow key={id}>
                <TableCell className={classes.item}>{title}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </Grid>
  </div>
}

function mapStateToProps(state: { auth: HomeProps, posts: { posts: Post[] } }) {
  return {
    posts: state.posts.posts,
    user: state.auth.user
  };
}

export default withStyles({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  header: {
    margin: "20px 0",
    backgroundColor: "#FCE093",
    padding: "16px 16px",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  email: {
    color: "#2F3333"
  },
  container: {
    margin: '18px 20%',
    borderRadius: "16px",
    boxShadow: "2px 2px 15px 0px rgba(50, 50, 50, 0.4)"
  },
  list: {
    padding: "8px 24px"
  },
  item: {
    color: "#878A8A",
    fontFamily: "Roboto",
    textTransform: "capitalize"
  }
})(connect(mapStateToProps)(Home));
