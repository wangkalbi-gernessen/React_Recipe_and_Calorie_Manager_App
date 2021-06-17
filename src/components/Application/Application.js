import { Container, makeStyles } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import PasswordReset from '../PasswordReset/PasswordReset';
// import React, { useContext } from 'react';
// import { UserContext } from '../../providers/UserProvider';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    width: "100%",
  }
});

const Application = () => {
  const classes = useStyle();
  // const user = useContext(UserContext);
  return (
    <Container className={classes.content}>
      <BrowserRouter>
        <Switch>
          <Route path="/SignUp/SignUp" component={SignUp}/>
          <Route exact path="/" component={Login}/>
          <Route path="/PasswordReset/PasswordReset" component={PasswordReset} />
          </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default Application;
