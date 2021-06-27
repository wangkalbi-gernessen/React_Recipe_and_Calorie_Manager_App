import { Container, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import RecipeList from '../RecipeList/RecipeList';
import BmrCalculator from '../BMR/BmrCalculator';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    width: "100%",
  }
});

const RouterAfterLogin = () => {
  const classes = useStyle();
  return (
    <Container className={classes.content}>
        <Switch>
          <Route path="/RecipeList/RecipeList" component={RecipeList}/>
          <Route component={Main}/>
          <Route path="/BMR/BmrCalculator" component={BmrCalculator} />
        </Switch>
    </Container>
  );
}

export default RouterAfterLogin;