import { Container, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import PasswordReset from '../PasswordReset/PasswordReset';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    width: "100%",
  }
});

const Application = () => {
  const classes = useStyle();
  return (
    <Container className={classes.content}>
        <Switch>
          <Route path="/SignUp/SignUp" component={SignUp}/>
          <Route exact path="/" component={Login}/>
          <Route path="/PasswordReset/PasswordReset" component={PasswordReset} />
        </Switch>
    </Container>
  );
}

export default Application;