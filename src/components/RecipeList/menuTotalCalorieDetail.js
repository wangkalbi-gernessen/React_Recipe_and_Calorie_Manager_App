import {  } from "@material-ui/core";
import { Container, makeStyles, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { auth, db } from '../../firebase/initFirebase';

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    minWidth: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0  
  }
});

const MenuTotalCalorieDetail = () => {
  const classes = useStyles();
  const userId = auth.currentUser.uid;
  const [recipe, setRecipe] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const selectedValue = location.state.value;

  useEffect(() => {
    db.collection('recipe').onSnapshot(snapshot => {
      const lists = snapshot.docs.map(doc => ({
        userId: doc.userId,
        dishName: doc.data().dishName,
        mealType: doc.data().mealType,
        ingredients: doc.data().ingredients
      }));  
      setRecipe(lists);
      console.log("lists:", recipe);
    })
  }, []);

  const goToMain = () => {
    history.push("/RecipeList/RecipeList");
  }

  return(
    <Container className={classes.content}>
      <Typography>Hello World</Typography>
      <Typography>{selectedValue}</Typography>
      <Button onClick={goToMain}>Go to Main</Button>
    </Container>
  );
}

export default MenuTotalCalorieDetail;