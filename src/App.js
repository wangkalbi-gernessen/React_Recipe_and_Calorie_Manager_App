import { Container, Grid, makeStyles } from '@material-ui/core';
import './App.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/initFirebase';
import Application from './components/Application/Application';
import { useHistory } from 'react-router-dom';
import RouterAfterLogin from './components/Application/RouterAfterLogin';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    minWidth: "100vw",
    minHeight: "100vh"
  }
});

function App() {
  const classes = useStyle();
  const [user] = useAuthState(auth); 
  const history = useHistory();
  if(user) {
    history.push("/");
  }
  return (
    user ? 
    <Grid container>
      <Grid item xs={12} sm={12} md={12} xl={12} lg={12} className={classes.content}>
        <RouterAfterLogin/>
      </Grid>
    </Grid>
    : 
    <Grid container>
      <Grid item xs={12} sm={12} md={12} xl={12} lg={12} className={classes.content}>
        <Application/>
      </Grid>
    </Grid>
  );
}

export default App;