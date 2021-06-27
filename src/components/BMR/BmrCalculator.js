import { RadioGroup } from "@material-ui/core";
import { useState } from 'react';
import { Typography, Container, Radio,FormLabel, TextField, Button, Paper, Grid, FormControlLabel, makeStyles } from "@material-ui/core";
import { auth } from "../../firebase/initFirebase";
import AnimatedNumber from 'react-animated-number';
import Appbar from "../Tabs/Appbar";

const useStyles = makeStyles({
  content: {
    background: "#DCF9A3",
    width: "100%",
    minHeight: "100vh",
    margin: 0,
    padding: 0
  },
  accountId: {
    margin: 0,
    padding: "5px"
  },
});

const BmrCalculator = () => {
  const classes = useStyles();

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [result, setResult] = useState(0);

  const calculateBMR = (event) => {
    event.preventDefault();
    if(gender === 'male') {
      let bmr = ((13.397 * weight) + (4.799 * height) - (5.677 * age) +  88.362).toFixed(2);
      setResult(bmr);
    } else {
      let bmr = ((9.247 * weight) + (3.098 * height) - (4.33 * age) +  447.593).toFixed(2);
      setResult(bmr);
    }
  }

  return(
      <Grid container spacing={0} direction="column" alignItems="center" justify="center" className={classes.content}>
        <Appbar/>
        <Grid item xs={16} style={{paddingTop: "30px"}}>
          <Paper elevation={4}>
            <Container className={classes.accountId}>
              <Typography>Your Account ID: <br/>{auth.currentUser.uid}</Typography>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={16} style={{padding: "25px"}}>
          <Paper elevation={4} style={{padding: "10px"}}>
            <Typography variant="h4" align="center" gutterBottom="true" style={{color: "#008b8b", fontWeight: "bold", padding: "15px"}}>Calculate BMR</Typography>
            <form noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}} >
            <Container className={classes.formArea}>
              <TextField id="age" type="number" label="Age" variant="outlined"  inputProps = {{ min: 0, max: 100 }} required value={age} onChange={(e) => setAge(e.target.value)} size="large"/>
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <FormLabel >Gender</FormLabel>
              <RadioGroup>
                <FormControlLabel value="male" control={<Radio color="primary"/>} label="Male" labelPlacement="end" checked={gender === 'male'} onClick={() => setGender('male')}/>
                <FormControlLabel value="female" control={<Radio color="primary"/>} label="Female" labelPlacement="end" checked={gender === 'female'} onClick={() => setGender('female')}/>
              </RadioGroup>
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <TextField id="height" type="number" label="Height" size="large" variant="outlined" inputProps={{ min: "0", step: "0.01" }}  required value={height} onChange={(e) => setHeight(e.target.value)} />
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <TextField id="weight" type="number" label="Weight" size="large" variant="outlined" inputProps={{ min: "0", step: "0.01" }} required value={weight} onChange={(e) => setWeight(e.target.value)}/>
            </Container>
            <Container style={{paddingTop:"10px"}}>
              <Button type="submit" variant="contained" size="large" color="primary" style={{cursor: "pointer"}} onClick={calculateBMR}>Calculate</Button>
            </Container>
          </form>
          <Typography align="center" variant="h5">BMR &#61;  
            <AnimatedNumber component="text" value={result} style={{margin: "10px", fontSize: "25px", transition: '0.8s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => (
            { opacity : perc / 100}
            )} duration={300} />
            kcal&#47;day
          </Typography>
          </Paper>
        </Grid>
      </Grid>
  );
}

export default BmrCalculator;