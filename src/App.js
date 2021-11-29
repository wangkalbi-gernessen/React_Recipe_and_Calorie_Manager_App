import { Container, makeStyles } from '@material-ui/core';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/initFirebase';
import Application from './components/Application/Application';
import { useHistory } from 'react-router-dom';
import RouterAfterLogin from './components/Application/RouterAfterLogin';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    width: "100%",
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
    <Container className={classes.content}>
      <RouterAfterLogin/>
    </Container>
    : 
    <Container className={classes.content}>
      <Application/>
    </Container>
  );
}

export default App;