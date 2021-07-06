import { Button, Grid, TextField } from "@material-ui/core";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { db, auth } from '../../firebase/initFirebase';
import DeleteIcon from '@material-ui/icons/Delete';
import AnimatedNumber from "react-animated-number";

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    minWidth: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0  
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
  nutritionFact: {
    width: "100%",
    background: "lime"    
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
  const [ ingredients, setIngredients ] = useState([]);
  const [nutritions, setNutritions] = useState([{
    sugar_g: 0,
    fiber_g: 0,
    serving_size_g: 0,
    sodium_mg: 0,
    potassium_mg: 0,
    fat_saturated_g: 0,
    fat_total_g: 0,
    calories: 0,
    cholesterol_mg: 0,
    protein_g: 0,
    carbohydrates_total_g: 0
  }]);

  const mergeNutrition = (data) => {
    const res = {};

    data.forEach(basket => { 
      for (let [key, value] of Object.entries(basket)) { 
        if (res[key]) { 
          res[key] += value; 
        } else { 
          res[key] = value;
        }
      }
    });
    return res;
  }

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

  const addIngredient = () => {
    setIngredients([
      ...ingredients, {
        id: ingredients.length + 1,
        name: ingredient,
        nutrition: nutritions
      }
    ]);
  };

  const deleteIngredient = (ingredientId) => {
    const updatedIngredients = ingredients.filter(ingredient => ingredient.id !== ingredientId);
    setIngredients(updatedIngredients);
  }

  const caloriesReducer = (total, item) => total + parseInt(item.nutrition.calories);
  const totalCalories = ingredients.reduce(caloriesReducer, 0);

  const carbsReducer = (total, item) => total + parseInt(item.nutrition.carbohydrates_total_g);
  const totalCarbs = ingredients.reduce(carbsReducer, 0);

  const proteinReducer = (total, item) => total + parseInt(item.nutrition.protein_g);
  const totalProtein = ingredients.reduce(proteinReducer, 0);

  const fatReducer = (total, item) => total + parseInt(item.nutrition.fat_total_g);
  const totalFat = ingredients.reduce(fatReducer, 0);

  const fiberReducer = (total, item) => total + parseInt(item.nutrition.fiber_g);
  const totalFiber = ingredients.reduce(fiberReducer, 0);

  // add data to firebase
  const registerRecipe = (event) => {
    event.preventDefault();
    db.collection('recipe').add({
      userId: userId,
      dishName: dishName,
      mealType: mealType,
      ingredients: ingredients
    }).catch(alert);

    history.push("/");
  }

  return(
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={16}>
        <Paper elevation={10}>
          <Typography variant="h4" align="center" gutterBottom="true" style={{fontFamily: "monospace", padding: "20px", color: "orange", fontWeight: "bold"}}>{dishName}</Typography>        
          <Container className={classes.formArea}>
            <Grid container direction="row" alignItems="center" justify="center">
              <form onSubmit={fetchAPI} noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}}>
                <TextField placeholder="1 tbsp soy sauce" variant="outlined" style={{background: "white", margin:"40px 20px"}} type="text" size="large" label="ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                <Button type="submit" variant="contained" color="primary" style={{cursor: "pointer"}} disabled={!ingredient}>Click</Button>
              </form>
            </Grid>
          </Container>
          {/* table of total nutrition of all ingredients */}
          <Container>
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
                  <TableCell align="right"><AnimatedNumber component="text" value={totalCalories} style={{margin: "10px", fontSize: "20px", transition: '0.5s linear', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={500} /> g</TableCell>
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
          </Container>
          <Container>
            <Typography variant="h6" style={{color: "brown", fontSize: "30px"}}>Ingredients</Typography>
            <Table size="small">
              <TableBody>
                { ingredients.map(ingredient => (
                  <TableRow key={ingredient.id}>
                    <TableCell>{ingredient.name}</TableCell>  
                    <TableCell><DeleteIcon onClick={() => deleteIngredient(ingredient.id)} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Container>
          {/* nutrition facts of all ingredients */}
          <Container>
            <Typography variant="h6" style={{color: "brown", fontSize: "30px"}}>Nutrition Facts</Typography>
            <Container className={classes.nutritionFact}>
              
            </Container>
          </Container>
          <Container>
            <Button size="large" color="secondary" variant="outlined" style={{cursor: "pointer", marginTop: "50px"}} type="submit" onClick={registerRecipe}>Add Recipe</Button>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MenuTotalCalorieDetail;