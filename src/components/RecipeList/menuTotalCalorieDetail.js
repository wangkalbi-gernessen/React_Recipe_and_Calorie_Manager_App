import { Button, TextField } from "@material-ui/core";
import { Container, FormControl, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

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

    // fetch data from Calorie Ninjas API
    const [ ingredients, setIngredients ] = useState('');
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
    <Container className={classes.content}>
      <Typography>Hello World</Typography>
      <FormControl>
        <TextField size="large" label="ingredients"
      value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <Button onClick={fetchAPI}>Click</Button>
      </FormControl>
    </Container>
  );
}

export default MenuTotalCalorieDetail;