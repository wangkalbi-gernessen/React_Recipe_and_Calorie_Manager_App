// import { Container, makeStyles } from '@material-ui/core';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/initFirebase';
// import UserProvider from './providers/UserProvider';
// import Application from './components/Application/Application';
import Main from './components/Main/Main';
import Application from './components/Application/Application';


// const useStyle = makeStyles({
//   content: {
//     margin: 0,
//     padding: 0,
//     width: "100%",
//   }
// });

function App() {
  // const classes = useStyle();
  const [user] = useAuthState(auth);
  return (
    // <UserProvider>
      // <Application/>
    // </UserProvider>
    user ? <Main/> :  <Application/>
  );
}

export default App;
