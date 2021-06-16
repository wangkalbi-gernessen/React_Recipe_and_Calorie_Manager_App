import { Container, makeStyles } from '@material-ui/core';
import './App.css';
import Application from './components/Application/Application';
import UserProvider from './Providers/UserProvider';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    width: "100%",
  }
});

function App() {
  const classes = useStyle();
  return (
    <Container className={classes.content}>
      <UserProvider>
        <Application/>
      </UserProvider>
    </Container>
  );
}

export default App;
