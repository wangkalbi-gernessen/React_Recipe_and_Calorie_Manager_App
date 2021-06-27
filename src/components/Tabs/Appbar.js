import React, { useState } from 'react';
import { AppBar, Avatar, Container, makeStyles, Tabs, Tab } from '@material-ui/core';
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
  }
});

const Appbar = () => {
  const classes = useStyle();
  const [value, setValue] = useState('2');
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const logout = () => {
    auth.signOut();
    history.push("/");
  }

  return(
    <Container className={classes.content}>
      <AppBar>
        <Tabs value={value} onChange={handleChange}>
          <Tab value={1} icon={<Avatar src={menu} className={classes.avatarSize}/>} component={Link} to="/RecipeList/RecipeList" />
          <Tab value={2} icon={<Avatar src={cooking} className={classes.avatarSize}/>} component={Link} to="/"/>
          <Tab value={3} icon={<Avatar src={calculator} className={classes.avatarSize}/>} component={Link} to="/BMR/BmrCalculator" />
          <Tab value={4} label="Log out" onClick={logout} style={{paddingLeft: 0}}/>
        </Tabs>
      </AppBar>
    </Container>
  )
}

export default Appbar;