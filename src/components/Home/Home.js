import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  home: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
  [theme.breakpoints.down("1123")]: {
    home: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    },
    quizbutton: {
      display: "inline-block"
    },
    quizitems: {
      maxWidth: "100%",
      padding: "0px ! important",
      paddingTop: "10px ! important"
    },
    button: {
      padding: "4px 6px",
      width: 185
    }
  }
}));

function Home() {
  const classes = useStyles();
  const date = new Date();
  const day =
    new Date().getDate() > 9
      ? new Date().getDate()
      : "0" + new Date().getDate();
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.home}>
      <Grid container spacing={3} className={classes.quizbutton}>
        <Grid item xs={6} className={classes.quizitems}>
          <Link
            to={`/datemonthquiz` + `/${day + "-0" + currentMonth + "-" + year}`}
          >
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                QUIZ {day + "-" + month}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} className={classes.quizitems}>
          <Link
            to={`/quizresult` + `/${day + "-0" + currentMonth + "-" + year}`}
          >
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                QUIZ RESULT {day + "-" + month}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} className={classes.quizitems}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                OLD QUIZ & RESULTS
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} className={classes.quizitems}>
          <Link to="/answerSheets">
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                Answer Sheets
              </Button>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
