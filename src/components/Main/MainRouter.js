import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import Main from './Main';
import AddIngredients from './AddIngredients';

const MainRouter = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/Main/AddIngredients" component={AddIngredients} />
      </Switch>
    </Router>
  );
}

export default MainRouter;