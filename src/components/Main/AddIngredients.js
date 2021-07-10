import { Button, Grid, TextField } from "@material-ui/core";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { db, auth } from '../../firebase/initFirebase';
import DeleteIcon from '@material-ui/icons/Delete';
import AnimatedNumber from "react-animated-number";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    minWidth: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: "30px"
  },
  inputArea: {
    margin: "auto",
    background: "white",
    width: "50%"
  },
  formArea: {
    background: "white",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: "auto",
    opacity: "0.6",
  },
  totalNutritions: {
    width: "100%",
    overflowX: "scroll"
  },
  nutritionFact: {
    width: "100%",
    height: "100%",
    background: "lime",
    overflow: "scroll"
  }, 
  addBtn: {
    width: "100%",
    margin: "0 auto",
    padding: "30px",
    textAlign: "center"
  }
});

const MenuTotalCalorieDetail = () => {
  const classes = useStyles();
  const location = useLocation();
  const dishName = location.state.dishName;
  const mealType = location.state.meal;
  const userId = auth.currentUser.uid;
  const history = useHistory();

  // fetch data from Calorie Ninjas API
  const [ ingredient, setIngredient ] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [nutritions, setNutritions] = useState({});

  const [selectedRecipeId, setSelectedRecipeId] = useState('');

  const mergeNutrition = (data) => {
    const res = {};

    data.forEach(basket => { 
      for (let [key, value] of Object.entries(basket)) { 
        if (res[key]) { 
          res[key] += value; 
        } else { 
          res[key] =  value;
        }
      }
    });
    return res;
  }

  // fetch data from Calorie Ninjas API
  const fetchAPI = (event) => {
    event.preventDefault();
    fetch('https://api.calorieninjas.com/v1/nutrition?query=' + ingredient, { 
      method: 'GET',
      headers: {'X-Api-Key': 'f/TgvT5UXyrfwO03Fzk/jw==hnra1zNlgjYiplLH'},
    })
    .then(res => res.json())
    .then(data => data.items)
    .then((items) => {
      let arr = items;
      const mergedNutritions = mergeNutrition(arr);
      for(let key in mergedNutritions) {
        nutritions[key] = mergedNutritions[key];
      }

      let dt = Object.assign({}, nutritions);
      setNutritions([dt]);
    }).catch((error) => {
      console.log("error");
    });
    addIngredient();
    setIngredient('');
  }

  useEffect(() => {
  }, [ingredients, selectedRecipeId]);
　　　　
  const addIngredient = () => {
    const newIngredients = {id: ingredients.length + 1, name: ingredient, nutrition: nutritions};
    setIngredients([...ingredients, newIngredients]);
    setSelectedRecipeId(ingredients.length + 1);
  };

  const deleteIngredient = (ingredientId) => {
    const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== ingredientId);
    let idCount = 1;
    for(let i = 0; i < updatedIngredients.length; i++) {
      if(updatedIngredients[i].id !== idCount) {
        updatedIngredients[i].id = idCount;
      }
      idCount++;
    }
    setIngredients(updatedIngredients);
    setSelectedRecipeId("");
  }

  const displayIngredientNutrition = (ingredientId) => {
    setSelectedRecipeId(ingredientId);
  }

  const totalCalories = ingredients.reduce((total, item) => {
    if(isNaN(item.nutrition.calories)) {
      return total;
    }
    return total + item.nutrition.calories;
  }, 0);

  const totalCarbs = ingredients.reduce((total, item) => {
    if(isNaN(item.nutrition.carbohydrates_total_g)) {
      return total;
    }
    return total + item.nutrition.carbohydrates_total_g;
  }, 0);

  const totalProtein = ingredients.reduce((total, item) => {
    if(isNaN(item.nutrition.protein_g)) {
      return total;
    }
    return total + item.nutrition.protein_g;
  }, 0);

  const totalFat = ingredients.reduce((total, item) => {
    if(isNaN(item.nutrition.fat_total_g)) {
      return total;
    }
    return total + item.nutrition.fat_total_g;
  }, 0);

  const totalFiber = ingredients.reduce((total, item) => {
    if(isNaN(item.nutrition.fiber_g)) {
      return total;
    }
    return total + item.nutrition.fiber_g;
  }, 0);

  // add data to firebase
  const registerRecipe = (event) => {
    event.preventDefault();
    // get auto generated ID for recipe
    const recipeId = db.collection('recipe').doc().id;
    // add data to firebase
    db.collection('recipe').doc(recipeId).set({
      recipeId: recipeId, 
      userId: userId,
      dishName: dishName,
      mealType: mealType,
      ingredients: ingredients
    })
    // go to main page
    history.push("/");
  }

  return(
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={11} sm={9} md={4} lg={4}>
        <Paper elevation={10}>
          <Typography variant="h4" align="center" gutterBottom="true" style={{fontFamily: "monospace", padding: "20px", color: "orange", fontWeight: "bold"}}>{dishName}</Typography>        
          <Container className={classes.formArea}>
            <Grid container direction="row" alignItems="center" justify="center">
              <form onSubmit={fetchAPI} noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}}>
                <Container>
                  <TextField placeholder="1 tbsp soy sauce" variant="outlined" style={{background: "white", margin:"40px 20px"}} type="text" size="large" label="ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                </Container>
                <Container>
                  <Button type="submit" variant="contained" color="primary" style={{cursor: "pointer"}} disabled={!ingredient}>Click</Button>
                </Container>
              </form>
            </Grid>
          </Container>
          {/* table of total nutrition of all ingredients */}
          <Container className={classes.totalNutritions}>
            <Grid container alignItems="center" direction="column" justify="center" spacing={0}>
              <Grid item xs={8} sm={6} md={3} lg={3}>
                <Table size="small">
                  <TableHead>
                    <TableRow style={{background: "green", borderRadius: "50%"}}>
                      <TableCell>Calories</TableCell>
                      <TableCell>Carbs</TableCell>
                      <TableCell>Protein</TableCell>
                      <TableCell>Fat</TableCell>
                      <TableCell>Fiber</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="right"><AnimatedNumber component="text" value={totalCalories} style={{margin: "10px", fontSize: "20px", transition: '0.5s linear', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} /> g</TableCell>
                      <TableCell align="right">
                        <AnimatedNumber component="text" value={totalCarbs} style={{margin: "10px", fontSize:  "20px", transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                        g</TableCell>
                      <TableCell align="right">
                        <AnimatedNumber component="text" value={totalProtein} style={{margin: "10px", fontSize:  "20px", transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                        g</TableCell>
                      <TableCell align="right">
                        <AnimatedNumber component="text" value={totalFat} style={{margin: "10px", fontSize:  "20px", transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                        g</TableCell>
                      <TableCell align="right">
                        <AnimatedNumber component="text" value={totalFiber} style={{margin: "10px", fontSize:  "20px", transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                        g</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Container>
          <Container>
            <Typography variant="h6" style={{color: "brown", fontSize: "30px"}}>Ingredients</Typography>
            <Table size="small">
              <TableBody>
                { ingredients.map(ingredient => (
                  <TableRow key={ingredient.id}>
                    <TableCell>{ingredient.name}</TableCell>  
                    <TableCell><DeleteIcon onClick={() => deleteIngredient(ingredient.id)} /></TableCell>
                    <TableCell><InfoOutlinedIcon onClick={() => displayIngredientNutrition(ingredient.id)} />{ingredient.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
          {/* nutrition facts of all ingredients */}
          <Container>
            <Typography variant="h6" style={{color: "brown", fontSize: "30px"}}>Nutrition Facts</Typography>
            {ingredients.length > 0 && selectedRecipeId ? 
            <Container className={classes.nutritionFact}>
              <Typography>Calories: {ingredients[selectedRecipeId - 1].nutrition.calories}</Typography>
              <Typography>Protein: {ingredients[selectedRecipeId - 1].nutrition.protein_g}</Typography>
            </Container>
            : 
            <Container>
              <Typography align="center" variant="h6">Not found</Typography>
            </Container>
            }
          </Container>
          <Container className={classes.addBtn}>
            <Button size="large" color="secondary" variant="outlined" style={{cursor: "pointer", marginTop: "50px"}} type="submit" onClick={registerRecipe}>Add Recipe</Button>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MenuTotalCalorieDetail;