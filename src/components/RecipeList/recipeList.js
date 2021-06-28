import { FormControl, Button, Paper, Grid, makeStyles, TableBody, TableRow, TableCell, TextField } from"@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useState } from "react";
import { db, auth }  from '../../firebase/initFirebase';

const useStyles = makeStyles({
  content: {
    background: "#f5f5dc",
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0
  },
  listArea: {
    background: "white",
    width: "100%",
    height: "100%",
    margin: 0,
    padding: "auto",
    opacity: "0.9",
  }
});

const meals = [
  {id: 1, meal: "Breakfast"},
  {id: 2, meal: "Lunch"},
  {id: 3, meal: "Snack"},
  {id: 4, meal: "Dinner"},
];

const RecipeList = () => {
  const [info, setInfo] = useState([]);
  const userId = auth.currentUser.uid;

  window.addEventListener('load', () => {
    FetchData();
  });

  const FetchData = () => {
    db.collection('recipe').where("userId", "==", userId ).get().then((querySnapshot) => {
      querySnapshot.forEach(element => {
        let data = element.data();
        setInfo(arr => [...arr, data]);
      })
    })
  }

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
      // console.log("error");
    });
  }

  const classes = useStyles();
  return(
    <Grid container spacing={0}direction="column" alignItems="center" justify="center" className={classes.content}>
      {/* <Appbar/> */}
      <Grid item xs={11}>
        <Paper elevation={5}>
          <TableBody>
          { meals.map((meal) => (
            <TableRow>
              <TableCell>{meal.meal}</TableCell>
              <TableCell>
                <NavigateNextIcon fontSize="large" onClick={() => console.log("good")}/>
              </TableCell>
          </TableRow>
          ))}
          </TableBody>
        </Paper>
      </Grid>
      <FormControl>
        <TextField size="large" label="ingredients"
      value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        <Button onClick={fetchAPI}>Click</Button>
      </FormControl>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </Grid>
  );
}

export default RecipeList;