import { Button, Grid, TextField, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, makeStyles, Typography } from "@material-ui/core";
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
    padding: "30px 0 30px"
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
    opacity: "0.7",
  },
  totalNutritions: {
    width: "90%",
    margin: "20px auto",
    overflowX: "scroll",
    padding: 0
  },
  ingredientsList: {
    width: "90%",
    maxHeight: "50%",
    background: "beige",
    overflow: "scroll",
    margin: "20px auto",
    padding: 0
  }, 
  addBtn: {
    width: "100%",
    margin: "0 auto",
    paddingBottom: "30px",
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
  
  const tableHeaders = [
    {title: "Calories"},
    {title: "Carbs"},
    {title: "Protein"},
    {title: "Fat"},
    {title: "Fiber"}
  ];

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
      setNutritions(dt);
    }).catch((error) => {
      console.log("error");
    });
    addIngredient(nutritions);
    setIngredient('');
  }

  useEffect(() => {
  }, [nutritions, ingredients, selectedRecipeId]);
　　　　
  const addIngredient = (nutritions) => {
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
    return total + item.nutrition.fat_total_g;;
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
    const recipeId = db.collection('recipes').doc().id;
    // add data to firebase
    db.collection('recipes').doc(recipeId).set({
      recipeId: recipeId, 
      userId: userId,
      dishName: dishName,
      mealType: mealType,
      ingredients: ingredients
    });
    // go to main page
    history.push("/");
  }

  return(
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={11} sm={9} md={4} lg={4}>
        <Paper elevation={10}>
          <Typography variant="h4" align="center" style={{fontFamily: "monospace", padding: "20px", color: "orange", fontWeight: "bold"}}>{dishName}</Typography>        
          <Container className={classes.formArea}>
            <Grid container direction="row" alignItems="center" justify="center">
              <form onSubmit={fetchAPI} noValidate autoComplete="off" style={{width: "100%", margin: "auto", textAlign: "center"}}>
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
            <Table size="small">
              <TableHead>
                <TableRow>
                  {tableHeaders.map((tableHeader) => (
                    <TableCell style={{background: "green", borderRadius: "10px", color: "white"}}>{tableHeader.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <AnimatedNumber component="text" value={totalCalories.toFixed(2)} style={{margin: "10px", fontSize:  "20px", transition: '0.5s linear', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                    g</TableCell>
                  <TableCell align="right">
                    <AnimatedNumber component="text" value={totalCarbs.toFixed(2)} style={{margin: "10px", fontSize:  "20px", transition: '0.5s linear', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                    g</TableCell>
                  <TableCell align="right">
                    <AnimatedNumber component="text" value={totalProtein.toFixed(2)} style={{margin: "10px", fontSize:  "20px", transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                    g</TableCell>
                  <TableCell align="right">
                    <AnimatedNumber component="text" value={totalFat.toFixed(2)} style={{margin: "10px", fontSize:  "20px", transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                    g</TableCell>
                  <TableCell align="right">
                    <AnimatedNumber component="text" value={totalFiber.toFixed(2)} style={{margin: "10px", fontSize:  "20px", transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => ({ opacity : perc / 100})} duration={100} />
                    g</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Container>
          <Container className={classes.ingredientsList}>
            <Container>
              <Typography align="center" style={{color: "brown", fontSize: "25px", fontWeight: "bold"}}>Ingredients</Typography>
              <Table size="small">
                <TableBody>
                  { ingredients.map(ingredient => (
                    <TableRow key={ingredient.id}>
                      <TableCell>{ingredient.name}</TableCell>  
                      <TableCell><DeleteIcon style={{cursor: "pointer"}} fontSize="large" onClick={() => deleteIngredient(ingredient.id)} /></TableCell>
                      <TableCell><InfoOutlinedIcon style={{cursor: "pointer"}} fontSize="large" onClick={() => displayIngredientNutrition(ingredient.id)} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Container>
            {/* nutrition facts of all ingredients */}
            <Container>
              <Typography align="center" style={{color: "brown", fontSize: "25px", fontWeight: "bold"}}>Nutrition Facts</Typography>
              {ingredients.length > 0 && selectedRecipeId ? 
              <Container>
                <Table size="small">
                  <TableBody>
                    <TableRow >
                      <TableCell>Calories</TableCell>
                      <TableCell><Typography style={{fontWeight: "bold"}}>{ingredients[selectedRecipeId - 1].nutrition.calories}</Typography>g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>% Daily Value*</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Fat {ingredients[selectedRecipeId - 1].nutrition.fat_total_g}g</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Saturated Fat {ingredients[selectedRecipeId - 1].nutrition.fat_saturated_g}g</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cholesterol {ingredients[selectedRecipeId - 1].nutrition.cholesterol_mg}mg</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Sodium {ingredients[selectedRecipeId - 1].nutrition.sodium_mg}mg</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Carbonhydrate {ingredients[selectedRecipeId - 1].nutrition.carbohydrates_total_g}g</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Total Sugars {ingredients[selectedRecipeId - 1].nutrition.sugar_g}g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Fiber {ingredients[selectedRecipeId - 1].nutrition.fiber_g}g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Protein {ingredients[selectedRecipeId - 1].nutrition.protein_g}g</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Potassium {ingredients[selectedRecipeId - 1].nutrition.potassium_mg}mg</TableCell>
                      <TableCell>%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>The % Daily Value(DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.(FDA.gov)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Container>
              : 
              <Container>
                <Typography align="center" variant="h5">No Data</Typography>
              </Container>
              }
            </Container>
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