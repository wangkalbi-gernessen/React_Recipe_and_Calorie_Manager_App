import React, { useState } from 'react';
import { Toolbar, AppBar, Avatar, Grid, makeStyles, Tabs, Tab } from '@material-ui/core';
import menu from '../../img/AppBar/menu.png';
import cooking from '../../img/AppBar/cooking.png';
import calculator from '../../img/AppBar/calculator.png';
import { auth } from "../../firebase/initFirebase";
import { useHistory, Link } from 'react-router-dom';

const useStyle = makeStyles({
  content: {
    margin: 0,
    padding: 0,
    width: "100%",
    flexGrow: 1,
  },
  root: {
    padding: 0,
    margin: 0
  },
  avatarSize: {
    width: "30%",
    height: "10%"
  },
});

const Appbar = () => {
  const classes = useStyle();
  const [value, setValue] = useState(1);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const logout = () => {
    auth.signOut();
    history.push("/");
  }

  return(
    <AppBar position="static">
      <Toolbar>
        <Grid container className={classes.content}>
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <Tabs value={value} onChange={handleChange} indicatorColor="secondary" variant="scrollable" scrollButtons="on">
              <Tab icon={<Avatar src={menu} className={classes.avatarSize}/>} component={Link} to="/RecipeList/RecipeList"/>
              <Tab icon={<Avatar src={cooking} className={classes.avatarSize}/>} component={Link} to="/"/>
              <Tab  icon={<Avatar src={calculator} className={classes.avatarSize}/>} component={Link} to="/BMR/BmrCalculator" />
              <Tab  label="Log out" onClick={logout} style={{paddingLeft: 0, fontSize: "15px"}}/>
            </Tabs>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar;