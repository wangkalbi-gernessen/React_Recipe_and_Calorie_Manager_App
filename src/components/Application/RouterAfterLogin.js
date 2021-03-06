import { Container, makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import RecipeList from '../RecipeList/RecipeList';
import BmrCalculator from '../BMR/BmrCalculator';
import AddIngredients from '../Main/AddIngredients';
import Appbar from '../Tabs/Appbar';
import MenuTotalCalorieDetail from '../RecipeList/MenuTotalCalorieDetail';
import EditRecipe from '../RecipeList/EditRecipe';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    minWidth: "100vw",
  }
});

const RouterAfterLogin = () => {
  const classes = useStyle();
  return (
    <Container className={classes.content}>
      <Appbar/>
      <Switch>
        <Route path="/RecipeList/RecipeList" component={RecipeList}/>
        <Route exact path="/" component={Main}/>
        <Route path="/BMR/BmrCalculator" component={BmrCalculator} />
        <Route path="/Main/AddIngredients" component={AddIngredients} />
        <Route path="/RecipeList/MenuTotalCalorieDetail" component={MenuTotalCalorieDetail} />
        <Route path="/RecipeList/EditRecipe" component={EditRecipe} />
      </Switch>
    </Container>
  );
}

export default RouterAfterLogin;