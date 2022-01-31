import { makeStyles, RadioGroup } from "@material-ui/core";
import { useState } from 'react';
import { Typography, Radio,FormLabel, TextField, Button, Paper, Grid, FormControlLabel } from "@material-ui/core";
import AnimatedNumber from 'react-animated-number';
import '../../styles/bmrCalculator.scss';

const useStyle = makeStyles(theme =>({
  gridItem: {
    width: "100%",
    height: "90%",
    margin: "0 auto",
    padding: theme.spacing(8),
  }
}));

const BmrCalculator = () => {
  const classes = useStyle();
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
      <Grid container className="content">
        <Grid item xs={12} sm={12} md={12} xl={12} lg={12} className={classes.gridItem} >
          <Paper elevation={4} className="paper">
            <Typography variant="h4" align="center" gutterBottom="true" className="title"
            >Calculate BMR</Typography>
            <form noValidate autoComplete="off" style={{width: "100%", margin: "auto", padding: "20px", textAlign: "center"}} >
            <Grid container>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                <TextField id="age" type="number" label="Age" variant="outlined"  inputProps = {{ min: 0, max: 100,"data-testid": "age"}} required value={age} onChange={(e) => setAge(e.target.value)} size="large"/>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} style={{paddingTop:"10px"}}>
                <FormLabel >Gender</FormLabel>
                <RadioGroup>
                  <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                    <FormControlLabel value="male" control={<Radio color="primary" inputProps={{"data-testid": "male"}} />} label="Male" labelPlacement="end" checked={gender === 'male'} onClick={() => setGender('male')} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                    <FormControlLabel value="female" control={<Radio color="primary" inputProps={{"data-testid": "female"}} />} label="Female" labelPlacement="end" checked={gender === 'female'} onClick={() => setGender('female')} />
                  </Grid>
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} style={{paddingTop:"10px"}}>
                <TextField id="height" type="number" label="Height" size="large" variant="outlined" inputProps={{ min: "0", step: "0.01", "data-testid": "height" }}  required value={height} onChange={(e) => setHeight(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} style={{paddingTop:"10px"}}>
                <TextField id="weight" type="number" label="Weight" size="large" variant="outlined" inputProps={{ min: "0", step: "0.01", "data-testid": "weight" }} required value={weight} onChange={(e) => setWeight(e.target.value)}/>
              </Grid>
              <Grid item xs={12} sm={12} md={12} xl={12} lg={12} style={{paddingTop:"10px"}}>
                <Button type="submit" variant="contained" size="large" color="primary" style={{cursor: "pointer"}} onClick={calculateBMR}>Calculate</Button>
              </Grid>
            </Grid>
          </form>
          <Typography align="center" variant="h5" data-testid="kcal">BMR &#61;  
            <AnimatedNumber component="text" value={result} style={{margin: "10px", fontSize: "25px", transition: '0.9s ease-out', transitionProperty: 'background-color, color, opacity'}} frameStyle={perc => (
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