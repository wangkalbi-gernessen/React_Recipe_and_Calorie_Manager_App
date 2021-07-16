/* eslint-disable jsx-a11y/alt-text */
import { Grid, Paper, Container, makeStyles, Button, Typography, Table, TableBody, TableHead, TableRow, TableCell,TextField, FormControl, FormControlLabel, RadioGroup, Radio} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { db } from '../../firebase/initFirebase';
import AnimatedNumber from "react-animated-number";
import DeleteIcon from '@material-ui/icons/Delete';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import friedEgg from "../../img/Main/fried-egg.png";
import sandwich from "../../img/Main/sandwich.png";
import food from "../../img/Main/food.png";
import steak from "../../img/Main/steak.png";
import NutritionFactModal from "./NutritionFactModal";

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    minWidth: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: "30px 0 30px"  
  }, 
  formArea: {
    width: "100%",
    margin: "30px auto",
    padding: 0,
    textAlign: "center"
  },
  radioArea: {
    width: "100%"
  }, 
  totalNutritions: {
    width: "90%",
    margin: "20px auto",
    overflowX: "scroll",
    padding: 0
  },
  editBtn: {
    width: "100%",
    margin: "0 auto",
    paddingBottom: "30px",
    textAlign: "center"  
  } 
});

const EditRecipe = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const recipe = location.state.recipe;
  const [ ingredient, setIngredient ] = useState("");
  const [nutritions, setNutritions] = useState({});
  const [selectedRecipeId, setSelectedRecipeId] = useState('');
  const [selectedRecipeNutrition, setSelectedRecipeNutrition] = useState('');
  const [updateDishName, setUpdatedDishName] = useState(recipe.dishName);
  const [updateMeal, setUpdatedMeal] = useState(recipe.mealType);
  const [updatedIngredients, setUpdatedIngredients] = useState(recipe.ingredients);
  const [open, setOpen] = useState(false);

  const totalCalories = updatedIngredients.reduce((total, item) => {
    if(isNaN(item.nutrition.calories)) {
      return total;
    }
    return total + item.nutrition.calories;
  }, 0);

  const totalCarbs = updatedIngredients.reduce((total, item) => {
    if(isNaN(item.nutrition.carbohydrates_total_g)) {
      return total;
    }
    return total + item.nutrition.carbohydrates_total_g;
  }, 0);

  const totalProtein = updatedIngredients.reduce((total, item) => {
    if(isNaN(item.nutrition.protein_g)) {
      return total;
    }
    return total + item.nutrition.protein_g;
  }, 0);

  const totalFat = updatedIngredients.reduce((total, item) => {
    if(isNaN(item.nutrition.fat_total_g)) {
      return total;
    }
    return total + item.nutrition.fat_total_g;;
  }, 0);

  const totalFiber = updatedIngredients.reduce((total, item) => {
    if(isNaN(item.nutrition.fiber_g)) {
      return total;
    }
    return total + item.nutrition.fiber_g;
  }, 0);

  const tableHeaders = [
    {title: "Calories"},
    {title: "Carbs"},
    {title: "Protein"},
    {title: "Fat"},
    {title: "Fiber"}
  ];

  // combine multiple ingredients at a time
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

  // reload recipe's ingredients in table
  useEffect(() => {
  }, [selectedRecipeId, selectedRecipeNutrition,  updatedIngredients]);

  // add a new ingredient
  const addIngredient = () => {
    const newIngredients = {id: updatedIngredients.length + 1, name: ingredient, nutrition: nutritions};
    setUpdatedIngredients([...updatedIngredients, newIngredients]);
  };

  const deleteIngredient = (ingredientId) => {
    const editedIngredients = updatedIngredients.filter(ingredient => ingredient.id !== ingredientId);
    let idCount = 1;
    for(let i = 0; i < editedIngredients.length; i++) {
      if(editedIngredients[i].id !== idCount) {
        editedIngredients[i].id = idCount;
      }
      idCount++;
    }
    setUpdatedIngredients(editedIngredients);
  }

  const editRecipe = () => {
    db.collection('recipes').doc(recipe.recipeId).update({
      dishName: updateDishName, 
      mealType: updateMeal,
      ingredients: updatedIngredients
    });
    history.push("/RecipeList/RecipeList");
  }

  const openDialog = (ingredient) => {
    setSelectedRecipeId(ingredient.id);
    setSelectedRecipeNutrition(ingredient.nutrition);
    setOpen(true);
  }

  const closeDialog = () => {
    setOpen(false);
  }

  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={11} sm={9} md={4} lg={4}>
        <Paper elevation={10}>
          <FormControl noValidate autoComplete="off" className={classes.formArea}>
            <Container>
              <Typography align="center" variant="h4">Edit Recipe</Typography>
              <TextField label="Edit dishName"  type="text" autoFocus value={updateDishName} variant="outlined" style={{background: "white", margin:"40px 20px"}} size="large" onChange={(event) => setUpdatedDishName(event.target.value)}/>
            </Container>
            <Grid container spacing={12} justify="space-evenly" alignItems="center" className={classes.radioArea}>
              <RadioGroup row aria-label="position" name="position" defaultValue="Breakfast" >
                <Grid item xs={6} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                  <Container>
                    <img src={friedEgg} width={60} height={60} />
                  </Container>
                  <FormControlLabel value="breakfast" control={<Radio color="primary" />}label="Breakfast" labelPlacement="top" checked={updateMeal === 'breakfast'} onClick={() => setUpdatedMeal('breakfast')} />
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                  <Container>
                    <img src={sandwich} width={60} height={60} />
                  </Container>
                  <FormControlLabel value="lunch" control={<Radio color="primary" />}label="Lunch"labelPlacement="top" checked={updateMeal === 'lunch'} onClick={() => setUpdatedMeal('lunch')}/>
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                  <Container>
                    <img src={food} width={60} height={60} />
                  </Container>
                  <FormControlLabel value="snack" control={<Radio color="primary" />}label="Snack"labelPlacement="top" checked={updateMeal === 'snack'} onClick={() => setUpdatedMeal('snack')}/>
                </Grid>
                <Grid item xs={6} sm={3} md={3} lg={3} style={{textAlign: "center"}}>
                  <Container>
                    <img src={steak} width={60} height={60} />
                  </Container>
                  <FormControlLabel value="dinner" control={<Radio color="primary" />}label="Dinner"labelPlacement="top" checked={updateMeal === 'dinner'} onClick={() => setUpdatedMeal('dinner')}/>
                </Grid>
              </RadioGroup>
            </Grid>
            <form onSubmit={fetchAPI} noValidate autoComplete="off" style={{width: "100%", margin: "auto", textAlign: "center"}}>
              <Container>
                <TextField placeholder="1 tbsp soy sauce" variant="outlined" style={{background: "white", margin:"40px 20px"}} type="text" size="large" label="ingredients" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
              </Container>
              <Container>
                <Button type="submit" variant="contained" color="primary" style={{cursor: "pointer"}} disabled={!ingredient}>Click</Button>
              </Container>
            </form>
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
            <Container style={{padding: 0}}>
              <Typography align="center" style={{color: "brown", fontSize: "25px", fontWeight: "bold"}}>Ingredients</Typography>
              <Table size="small">
                <TableBody>
                { updatedIngredients.map((res) => (
                  <TableRow>
                    <TableCell>
                      <Typography variant="h5" align="left" style={{fontWeight: "bold"}}>{res.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <DeleteIcon style={{cursor: "pointer"}} fontSize="large" onClick={() => deleteIngredient(res.id)} />
                    </TableCell>
                    <TableCell><InfoOutlinedIcon style={{cursor: "pointer"}} fontSize="large" onClick={() => openDialog(res)}/></TableCell>
                </TableRow>
                ))}
                </TableBody>
              </Table>
            </Container>
            <Container className={classes.editBtn}>
              <Button size="large" color="secondary" variant="outlined" style={{cursor: "pointer", marginTop: "50px"}} type="submit" onClick={editRecipe}>Edit Recipe</Button>
            </Container>
          </FormControl>
          {/* connect dialog of nutrition facts */}
          <NutritionFactModal open={open} handleClose={closeDialog} selectedRecipeNutrition={selectedRecipeNutrition} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EditRecipe;