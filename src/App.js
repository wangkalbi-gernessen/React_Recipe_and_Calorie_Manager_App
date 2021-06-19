import { Container, makeStyles } from '@material-ui/core';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/initFirebase';
import UnderTab from './components/Tabs/UnderTab';
import Application from './components/Application/Application';


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
  return (
    user ? 
    <Container className={classes.content}>
      <UnderTab/>
    </Container>
    : 
    <Container className={classes.content}>
      <Application/>
    </Container>
  );
}

export default App;