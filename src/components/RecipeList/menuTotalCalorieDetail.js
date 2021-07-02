import {  } from "@material-ui/core";
import { Container, makeStyles, Typography } from "@material-ui/core";
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
  return(
    <Container className={classes.content}>
      <Typography>Hello World</Typography>
    </Container>
  );
}

export default MenuTotalCalorieDetail;