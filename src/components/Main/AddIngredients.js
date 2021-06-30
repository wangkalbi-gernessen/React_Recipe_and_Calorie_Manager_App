import { Button, Grid, TextField } from "@material-ui/core";
import { Paper, Container, FormControl, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

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
  }
});

const MenuTotalCalorieDetail = () => {
  const classes = useStyles();
  const location = useLocation();
  const myParam = location.state.params;

  // fetch data from Calorie Ninjas API
  const [ ingredients, setIngredients ] = useState([]);
  const [items, setItems] = useState([]);

  const fetchAPI = (event) => {
    event.preventDefault();
    fetch('https://api.calorieninjas.com/v1/nutrition?query=' + ingredients, {
      method: 'GET',
      headers: {'X-Api-Key': 'f/TgvT5UXyrfwO03Fzk/jw==hnra1zNlgjYiplLH'},
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      setItems(result);
    }).catch((error) => {
      console.log("error");
    });
  }

  return(
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.content}>
      <Grid item xs={16}>
        <Paper elevation={10}>
        <Typography variant="h4" align="center" gutterBottom="true" style={{fontFamily: "monospace", padding: "20px", color: "orange", fontWeight: "bold"}}>{myParam}</Typography>        
      <FormControl noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}}>
        <Container className={classes.formArea}>
          <Grid container direction="row" alignItems="center" justify="center">
            <TextField placeholder="1 tbsp soy sauce" variant="outlined" style={{background: "white", margin:"40px 20px"}} type="text" size="large" label="ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            <Button onClick={fetchAPI} variant="contained" color="primary" style={{cursor: "pointer"}} disabled={!ingredients}>Click</Button>
          </Grid>
        </Container>
      </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MenuTotalCalorieDetail;