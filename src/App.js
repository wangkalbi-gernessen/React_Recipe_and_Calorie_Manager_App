import { Container, makeStyles } from '@material-ui/core';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/initFirebase';
import TopTab from './components/Tabs/TopTab';
import Application from './components/Application/Application';
import { Redirect } from 'react-router';

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
    // <Container className={classes.content}>
    //   <TopTab/>
    // </Container>
    <Redirect to="Main/Main" />
    : 
    <Container className={classes.content}>
      <Application/>
    </Container>
  );
}

export default App;