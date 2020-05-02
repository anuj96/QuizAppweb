import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Grid from "@material-ui/core/Grid";
const widthProportion = "100%";

const useStyles = makeStyles(theme => ({
  footer: {
    position: "fixed",
    bottom: 0,
    left: "0%",
    width: widthProportion
  },
  [theme.breakpoints.down("400")]: {
    footerFont: {
      fontSize: 8
    }
  },
  [theme.breakpoints.between("400", "xs")]: {
    footerFont: {
      fontSize: 10
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <BottomNavigation>
        <Typography variant="h6" className={classes.footerFont} gutterBottom>
          Developed by:
        </Typography>
        <Typography variant="h6" className={classes.footerFont} gutterBottom>
          RAJESH JAIN & GAUTAM KOCHAR UJJAIN UJJAIN,
        </Typography>
        <Typography variant="h6" className={classes.footerFont} gutterBottom>
          MOB:8989984415
        </Typography>
      </BottomNavigation>
    </div>
  );
};

export default Footer;
