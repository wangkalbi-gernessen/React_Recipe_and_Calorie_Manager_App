import React, { useState } from 'react';
import Main from '../Main/Main';
import RecipeList from '../RecipeList/RecipeList';
import BmrCalculator from '../BMR/BmrCalculator';
import { AppBar, Avatar, Container, makeStyles, Tab } from '@material-ui/core';
import { TabPanel, TabContext, TabList } from '@material-ui/lab';
import menu from '../../img/AppBar/menu.png';
import cooking from '../../img/AppBar/cooking.png';
import calculator from '../../img/AppBar/calculator.png';
import { auth } from "../../firebase/initFirebase";


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

const UnderTab = () => {
  const classes = useStyle();
  const [value, setValue] = useState('2');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const logout = () => {
    auth.signOut();
  }

  return(
    <Container className={classes.content}>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab icon={<Avatar src={menu} className={classes.avatarSize}/>} value="1" />
            <Tab icon={<Avatar src={cooking} className={classes.avatarSize}/>} value="2" />
            <Tab icon={<Avatar src={calculator} className={classes.avatarSize}/>} value="3" />
            <Tab label="Log out" onClick={logout} value="4" style={{paddingLeft: 0}}/>
          </TabList>
        </AppBar>
        <TabPanel value="1" className={classes.root}>
          <RecipeList/>
        </TabPanel>
        <TabPanel value="2" className={classes.root}>
          <Main/>
        </TabPanel>
        <TabPanel value="3" className={classes.root}>
          <BmrCalculator/>
        </TabPanel>
      </TabContext>
    </Container>
  )
}

export default UnderTab;