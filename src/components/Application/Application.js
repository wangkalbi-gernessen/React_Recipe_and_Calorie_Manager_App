import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import PasswordReset from '../PasswordReset/PasswordReset';
import { Container, makeStyles } from '@material-ui/core';
import { UserContext } from '../Providers/UserProvider';
import UserProvider from '../Providers/UserProvider';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    width: "100%",
  }
});

const Application = () => {
  const user = useContext(UserContext);
  const classes = useStyle();
  return(
    user ? 
    <Container className={classes.content}>
      <Main />
    </Container>
    : 
    <Container className={classes.content}>
      <BrowserRouter>
        <Switch>
          <Route path="/SignUp/SignUp" component={SignUp}>
          </Route>
          <Route path="/" component={Login}>
          </Route>
          <Route path="/PasswordReset/PasswordReset" component={PasswordReset}>
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default Application;