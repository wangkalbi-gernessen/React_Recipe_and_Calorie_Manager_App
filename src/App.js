import { Container, makeStyles } from '@material-ui/core';
import SignUp from './components/SignUp/SignUp';
import './App.css';

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
      <SignUp />
    </Container>
  );
}

export default App;
